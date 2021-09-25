const STORAGE_PREFIX = "canvasplus-search-cache-v4-"

let searchData = {}

const getLocalStoragePromise = async(get) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(get, (data) => {
            resolve(data)
        })  
    })
}

const getFromCache = async (path, getFromStorageIndividually = true) => {
    path = STORAGE_PREFIX + path;

    if(Array.isArray(path)) {
        const returnable = {}
        const notInSessionStorage = []

        for(let eachPath of path) {
            const session = getFromCache(eachPath, false)
            if(sesion !== null) {
                returnable[eachPath]  = sesion
            } else {
                notInSessionStorage.push(eachPath)
            }
        }

        const fromStorage = await getLocalStoragePromise(notInSessionStorage)
        for(let eachPath of Object.keys(fromStorage)) {
            returnable[eachPath] = fromStorage[eachPath]
        }

        return returnable
    }

    const session = sessionStorage.getItem(path)
    if(session !== null && session !== undefined) {
        try {
            const json = JSON.parse(session)
            return json
        } catch {
            return session;
        }
    }

    if(getFromStorageIndividually) {
        const storage = await getLocalStoragePromise([path])
        return storage[path];
    }
}

const getFetchableBasic = async( searchDataKey, cachePath, fetchPath, fetchResponseHandler = (data) => {return data}, forceReload = false, validCachePeriod = 604800000, recacheGrace = 259200000 ) => {
    if(!forceReload) {
        const fromSearchData = searchData[searchDataKey]
        if(fromSearchData !== undefined) {
            return fromSearchData
        }

        const cached = await getFromCache(cachePath)
        if(cached !== undefined && cached !== null && Date.now() - cached.lastUpdated <= validCachePeriod) {
            if(Date.now() - cached.lastUpdated > recacheGrace) {
                getFetchableBasic( searchDataKey, cachePath, fetchPath, true )
            }
            return cached.data
        }
    }

    const response = await smartAPIFetch(getPathAPI(fetchPath))
    const json = await response.json()
    const returnable = await fetchResponseHandler(json)

    const toChangeStorage = {}
    toChangeStorage[STORAGE_PREFIX + cachePath] = {
        lastUpdated: Date.now(),
        data: returnable
    }

    sessionStorage.setItem(STORAGE_PREFIX + cachePath, JSON.stringify(toChangeStorage[STORAGE_PREFIX + cachePath]))

    chrome.storage.local.set(toChangeStorage)

    return returnable;
}

const getFetchablePaginated = async( searchDataKey, cachePath, fetchPath, fetchResponseHandler = (data) => {return data}, forceReload = false, validCachePeriod = 604800000, recacheGrace = 259200000 ) => {
    if(!forceReload) {
        const fromSearchData = searchData[searchDataKey]
        if(fromSearchData !== undefined) {
            return fromSearchData
        }

        const cached = await getFromCache(cachePath)
        if(cached !== undefined && cached !== null && Date.now() - cached.lastUpdated <= validCachePeriod) {
            if(Date.now() - cached.lastUpdated > recacheGrace) {
                getFetchableBasic( searchDataKey, cachePath, fetchPath, true )
            }
            return cached.data
        }
    }

    let response = []
    let i = 1;
    const url = getPathAPI(fetchPath);
    const urlParamsStarter = (new URL(url).searchParams.keys().next().done ? "?" : "&")
    while(true) {
        const fetchResponse = await smartAPIFetch(url + urlParamsStarter + "per_page=100&page=" + i)
        const fetchResponseJson = await fetchResponse.json()
        response = response.concat(fetchResponseJson)
        if(fetchResponseJson.length < 100) break;
    }


    const returnable = await fetchResponseHandler(response)

    const toChangeStorage = {}
    toChangeStorage[STORAGE_PREFIX + cachePath] = {
        lastUpdated: Date.now(),
        data: returnable
    }

    sessionStorage.setItem(STORAGE_PREFIX + cachePath, JSON.stringify(toChangeStorage[STORAGE_PREFIX + cachePath]))

    chrome.storage.local.set(toChangeStorage)

    return returnable;
}

const getCourseList = async (forceReload = false) => {
    return getFetchableBasic("courses", "courses", "/api/v1/users/self/favorites/courses", async (data) => {
        const colors = (await (await fetch("/api/v1/users/self/colors")).json())["custom_colors"]
        const returnable = {}

        for(let course of data) {
            returnable[course.id] = {
                id: course.id,
                name: course.name,
                color: colors['course_' + course.id]
            }
        }
        
        return returnable
    }, forceReload)
}

const getCourseContent = async ( courseId, forceReload = false ) => {
    const tabs = await getFetchableBasic("courses/" + courseId + "/tabs", "courses/" + courseId + "/tabs", "/api/v1/courses/" + courseId + "/tabs", async (data) => {
        const returnable = {}
        for(let tab of data) {
            returnable[tab.id] = tab
        }
        return returnable;
    }, forceReload)
    
    const courseContent = {tabs:tabs}

    const courseContentPromises = []
    
    if(tabs.pages) {
        const pages = getCoursePages(courseId, forceReload);
        pages.then((data) => {

            data.forEach(page => {
                courseContent['pages/' + page.id] = page
            })
        })
        courseContentPromises.push(pages)
    }

    if(tabs.modules) {
        const modules = getCourseModules(courseId, forceReload);
        modules.then((data) => {
            
        })
    }

    const promiseResults = await Promise.allSettled(courseContentPromises)
    console.log(promiseResults);
    
    return { courseId: courseId, content: courseContent };
}

const getCoursePages = async ( courseId, forceReload = false ) => {
    return getFetchablePaginated("courses/" + courseId + "/pages", "courses/" + courseId + "/pages", "/api/v1/courses/" + courseId + "/pages", async (data) => {
        const returnable = []
        for(let page of data) {
            returnable.push({
                title: page.title,
                url: page.html_url,
                updated: new Date(page.updated_at).getTime(),
                id: page.page_id
            })
        }
        return returnable;
    }, forceReload)
}

const getCourseModules = async ( courseId, forceReload = false ) => {
    return getFetchablePaginated("courses/" + courseId + "/modules", "courses/" + courseId + "/modules", "/api/v1/courses/" + courseId + "/modules?include=items", async (data) => {
        const modules = []
        const items = []
        for(let module of data) {
            const url = new URL(module["items_url"])
            modules.push({
                id: module.id,
                url: url.protocol + '//' + url.hostname + '/courses/' + courseId + '/modules?cpx-jump-to=' + module.id,
                title: module.name
            })
            module.items.forEach(moduleItem => {
                let itemUrl;

                if(moduleItem.type === "Page") {
                    itemUrl = url.protocol + '//' + url.hostname + '/courses/' + courseId + '/pages/' + moduleItem['page_url']     
                }

                if(itemUrl) {
                    items.push({
                        id: moduleItem.id,
                        title: moduleItem.title,
                        url: itemUrl
                    })
                }
            })
        }
        console.log(modules, items);
        const returnable = []
        return returnable;
    }, forceReload)
}

const searchContent = {done: false, courses: {}, searchIndexByWord: {}};

const main = async () => {
    const courses =  await getCourseList()

    const courseContentPromises = []

    for(let course of Object.values(courses))  {
        courseContentPromises.push(getCourseContent(course.id, true))
    }

    Promise.allSettled(courseContentPromises)
    .then((results) => {
        results.forEach((course) => {
            course = course.value      
            console.log(course);
            searchContent['courses'][course['courseId']] = {
                meta: courses[course.courseId],
                content: course
            }

            Object.keys(course.content).forEach(key => {
                if(key !== "tabs") {
                    const page = course["content"][key];
                    const words = smartSplit(page.title);
                    words.forEach(word => {
                        if(searchContent["searchIndexByWord"][word]) {
                            searchContent["searchIndexByWord"][word].push(page)
                        } else {
                            searchContent["searchIndexByWord"][word] = [page]
                        }
                    })
                }
            })
        })

        searchContent.done = true;
    })
}

const search = async (query) => {
    const simpleQuery = filterAlphanumeric(query).toLowerCase();
    const results = {}

    Object.keys(searchContent["searchIndexByWord"]).forEach(key => {
        if(simpleQuery.includes(key)) {
            searchContent["searchIndexByWord"][key].forEach(item => {
                if(results[item.url]) {
                    results[item.url].relevance += 1.0
                } else {
                    results[item.url] = {relevance: 1.0, item: item}
                }
            })
        }
    })
    return Object.values(results);
}

main()