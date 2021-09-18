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
        console.log(storage[path]);
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

    // if(!forceReload) {
    //     if()
    //     const cached = await getFromCache('courses')
    //     console.log(cached);
    //     if(cached !== undefined && cached !== null && Date.now() - cached.lastUpdated <= 604800000) {
    //         if(Date.now() - cached.lastUpdated > 259200000) {
    //             getCourseList(true)
    //         }
    //         return cached.data;
    //     }
    // }

    // const response = await fetch(getPathAPI('/api/v1/users/self/favorites/courses'))
    // const json = await response.json()
    // const returnable = {}

    // for(let course of json) {
    //     returnable[course.id] = {
    //         id: course.id,
    //         name: course.name,
    //         color: course.course_color
    //     }
    // }
    
    // const toChange = {}
    // toChange[STORAGE_PREFIX + 'courses'] = {
    //     lastUpdated: Date.now(),
    //     data: returnable
    // }
    // console.log(toChange);

    // sessionStorage.setItem(STORAGE_PREFIX + 'courses', JSON.stringify(toChange[STORAGE_PREFIX + 'courses']))
    // chrome.storage.local.set(toChange)
    // return returnable;
}

const getCourseContent = async ( courseId, forceReload = false ) => {
    return getFetchableBasic("courses/" + courseId + "/tabs", "courses/" + courseId + "/tabs", "/api/v1/courses/" + courseId + "/tabs", async (data) => {
        const returnable = {}
        for(let tab of data) {
            returnable[tab.id] = tab
        }
        return returnable;
    }, forceReload)
}

const main = async () => {
    const courses =  await getCourseList()

    const courseContentPromises = []

    for(let course of Object.values(courses))  {
        courseContentPromises.push(getCourseContent(course.id))
    }

    Promise.allSettled(courseContentPromises).then((results) => results.forEach((result) => console.log(result)))
    console.log(courses);
}

main()