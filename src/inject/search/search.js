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

    if(tabs.assignments) {
        const assignments = getCourseAssignments(courseId, forceReload);
        assignments.then((data) => {
            data.forEach((assignment) => {
                courseContent['assignments/' + assignment.id] = assignment;
            })
        })
    }

    if(tabs.modules) {
        const modules = getCourseModules(courseId, forceReload);
        modules.then((data) => {
            data.modules.forEach(module => {
                courseContent['modules/' + module.id] = module
            })
            data.items.forEach(item => {
                let courseContentPath;
                if(item.type === 'Page') {
                    courseContentPath = 'pages/' + item.id;
                } else if(item.type === 'Assignment') {
                    courseContentPath = 'assignments/' + item.id;
                } else {
                    courseContentPath = 'module-item/' + item.id;
                }
                
                if(courseContentPath) {
                    if(courseContent[courseContentPath]) {
                        courseContent[courseContentPath].locations = courseContent[courseContentPath].locations.concat(item.locations)
                    } else {
                        courseContent[courseContentPath] = item
                    }
                }
            })
        })
        courseContentPromises.push(modules)
    }

    await Promise.allSettled(courseContentPromises)
    
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
                id: page.url,
                locations: [{'type': 'tab', 'name': 'Pages', 'id': 'pages'}]
            })
        }
        return returnable;
    }, forceReload)
}

const getCourseAssignments = async ( courseId, forceReload = false ) => {
    return getFetchablePaginated("courses/" + courseId + "/assignments", "courses/" + courseId + "/assignments", "/api/v1/courses/" + courseId + "/assignments", async (data) => {
        const returnable = []
        for(let assignment of data) {
            returnable.push({
                title: assignment.name,
                url: assignment.html_url,
                updated: new Date(assignment.updated_at).getTime(),
                id: assignment.id,
                locations: [{'type': 'tab', 'name': 'Assignments', 'id': 'assignments'}]
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
                title: module.name,
                locations: [{'type': 'tab', 'name': 'Modules', 'id': 'modules'}]
            })
            module.items.forEach(moduleItem => {
                let itemUrl;
                let itemId;

                if(moduleItem.type === "Page") {
                    itemUrl = url.protocol + '//' + url.hostname + '/courses/' + courseId + '/pages/' + moduleItem['page_url'];
                    itemId = moduleItem['page_url'];
                }
                else if(moduleItem.type === "Assignment") {
                    itemUrl = url.protocol + '//' + url.hostname + '/courses/' + courseId + '/assignments/' + moduleItem['content_id']
                    itemId = moduleItem['content_id']
                }
                else if(moduleItem.type !== "Header" && moduleItem.type !== "SubHeader") {
                    itemUrl = moduleItem['html_url'];
                }

                if(itemUrl) {
                    items.push({
                        id: itemId || moduleItem.id,
                        title: moduleItem.title,
                        url: itemUrl,
                        type: moduleItem.type,
                        locations: [{'type': 'module', 'name': module.name, 'id': module.id}]
                    })
                }
            })
        }
        const returnable = { modules, items };
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
            console.log(course);
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
                const indices = [... simpleQuery.matchAll(new RegExp(key, 'g')) ].map(i => { return i.index } );
                if(results[item.url]) {
                    const newIndices = indices.filter(i => {
                        return !results[item.url].indices.includes(i)
                    })
                    results[item.url].relevance += (0.1 * key.length * 2) + (newIndices.length * 1.5)
                    results[item.url].indices = results[item.url].indices.concat(newIndices)
                } else {
                    results[item.url] = {relevance: (0.1 * key.length * 2) + (indices.length * 2), indices: indices, item: item}
                }
            })
        }
    })
    return Object.values(results).sort((a, b) => {
        return b.relevance - a.relevance
    });
}

const searchUpdateUI = async(query) => {
    const results = await search(query);
    searchUI.results = []
    results.forEach(result => {
        searchUI.results.push({
            course: {
                name: "Course",
                color: "#f43daa"
            },
            name: result.item.title,
            locations: result.item.locations
        })
    })
    searchUI.buildResults()
    return results;
}

class SearchUI {
    constructor() {
        this.mode = 'search'

        this.queryCompontents = []
        /*
        interface SearchResult {
            course: Course,
            name: String,
            topMeta: String,
            locations: Array[SearchResultLocation]
        }
        interface SearchResultLocation {
            selected: boolean,
            name: String,
            modifyUrl: function
        }
        interface Course {
            color: String,
            name: String
        }
        */
        this.results = []
        this.controls = []
    }

    createEntireElement() {
        this.wrapperElement = document.createElement('div')
        this.wrapperElement.id = 'canvasplus-search-ui-wrapper'
        this.wrapperElement.className = 'canvasplus-search-ui-wrapper'

        this.element = document.createElement('div')
        this.element.className = 'canvasplus-search-ui'

        {
            this.headerElement = document.createElement('div')
            this.headerElement.className = 'canvasplus-search-ui-header'

            this.headerElementIcon = document.createElement('div')
            this.headerElementIcon.className = 'canvasplus-search-ui-header-icon'

            this.headerElementQueryWrapper = document.createElement('div')
            this.headerElementQueryWrapper.className = 'canvasplus-search-ui-query-wrapper'
            this.headerElementQueryWrapper.innerText = 'Search Query'

            this.headerElement.appendChild(this.headerElementIcon)
            this.headerElement.appendChild(this.headerElementQueryWrapper)
            this.element.appendChild(this.headerElement)
        }

        {
            this.resultsElement = document.createElement('div')
            this.resultsElement.className = 'canvasplus-search-ui-results'
            this.element.appendChild(this.resultsElement)
        }

        {
            this.controlsElement = document.createElement('div')
            this.controlsElement.className = 'canvasplus-search-ui-controls'
            this.element.appendChild(this.controlsElement)
        }

        this.buildResults()
        
        this.wrapperElement.appendChild(this.element)
    }

    buildResults() {
        this.resultsElement.innerHTML = ''
        this.results.forEach((result) => {
            this.resultsElement.appendChild(this.buildResult(result))
        })
    }

    buildResult(result) {
        const resultElement = document.createElement('div')
        resultElement.className = 'canvasplus-search-ui-results-single-result'

        const resultLeft = document.createElement('div')
        resultLeft.className = 'canvasplus-search-ui-results-single-result-left'

        const resultInner = document.createElement('div')
        resultInner.className = 'canvasplus-search-ui-results-single-result-left-inner'
        resultInner.innerText = result.name
        
        if(result.topMeta) {
            resultElement.classList.add('includes-top-meta')
            
            const resultTopMeta = document.createElement('div')
            resultTopMeta.className = 'canvasplus-search-ui-results-single-result-left-topmeta'
            resultTopMeta.innerText = result.topMeta
            
            resultLeft.appendChild(resultTopMeta)
        }
        resultLeft.appendChild(resultInner)
        resultElement.appendChild(resultLeft)

        if(result.course) {
            resultElement.classList.add('includes-course-card')

            const resultRight = document.createElement('div')
            resultRight.className = 'canvasplus-search-ui-results-single-result-right'
            
            const resultRightCourse = document.createElement('div')
            resultRightCourse.className = 'canvasplus-search-ui-results-single-result-right-course'
            resultRightCourse.innerText = result.course.name
            resultRightCourse.style = `--course-card-color:${result.course.color}`
            
            const resultRightBreadcrumb = document.createElement('div')
            resultRightBreadcrumb.className = 'canvasplus-search-ui-results-single-result-right-breadcrumb'
            console.log(result);
            resultRightBreadcrumb.innerText = result.locations[0].name

            resultRight.appendChild(resultRightBreadcrumb)
            resultRight.appendChild(resultRightCourse)

            if(result.locations.length >= 2) {
                resultElement.classList.add('includes-multiple-locations')
            }

            resultElement.appendChild(resultRight)
        }

        return resultElement;
    }

    insert(where) {
        this.createEntireElement()
        this.where = where;
        where.appendChild(this.wrapperElement)
    }

    remove() {
        this.where.removeChild(this.element)
    }
}

const searchUI = new SearchUI()
    searchUI.insert(document.body)
    
main()