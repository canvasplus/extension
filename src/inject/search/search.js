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

const searchContent = {done: false, courses: {}, searchIndexByWord: {}, entireRawIndex: []};

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
            const meta = courses[course.courseId];
            searchContent['courses'][course['courseId']] = {
                meta: meta,
                content: course
            }

            Object.keys(course.content).forEach(key => {
                if(key !== "tabs") {
                    const page = course["content"][key];
                    page.course = meta;

                    searchContent["entireRawIndex"].push(page)

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

const search = async (query, callback) => {
    const simpleQuery = filterAlphanumeric(query).toLowerCase();
    let results = {}

    Object.keys(searchContent["searchIndexByWord"]).forEach(key => {
        if(simpleQuery.includes(key)) {
            searchContent["searchIndexByWord"][key].forEach(item => {
                const references = smartSplit(query);
                const subjects = smartSplit(item.title);
                let scores = 0;
                references.forEach(reference => {
                    const max = reference.length;

                    let current = {subject: undefined, similarity: 0};
                    subjects.find(subject => {
                        if(reference === subject) {
                            current = {subject: subject, similarity: max};
                            return true;
                        }
                        const similarity = compareWords(reference, subject);
                        if(similarity >= max) {
                            current = {subject: subject, similarity: max};
                            return true;
                        }
                        if(similarity > current.similarity) {
                            current = {subject: subject, similarity: similarity};
                        }
                        return false;
                    })
                })
                if(filterAlphanumeric(item.title).toLowerCase().includes(filterAlphanumeric(query).toLowerCase())) {
                    scores *= 1.5
                    if(item.title.toLowerCase().includes(query.toLowerCase())) {
                        scores *= 1.5
                    }
                }
                
                const max = references.map(reference => {
                    return reference.length;
                }).reduce((a, b) => { return a + b} )
                
                if(results[item.url]) {
                    results[item.url].relevance = Math.max(results[item.url].relevance, scores/max)
                } else {
                    results[item.url] = {
                        relevance: scores/max,
                        item: item
                    }
                }
            })
        }
    })


    callbackReturn = Object.values(results).sort((a, b) => {
        return b.relevance - a.relevance
    })

    callback(callbackReturn);

    results = {}

    new Promise((resolve, reject) => {
        searchContent["entireRawIndex"].forEach((item, idx) => {
            const references = smartSplit(query);
            const subjects = smartSplit(item.title);
            let scores = 0;
            references.forEach(reference => {
                const max = reference.length;
    
                let current = {subject: undefined, similarity: 0};
                subjects.find(subject => {
                    if(reference === subject) {
                        current = {subject: subject, similarity: max};
                        return true;
                    }
                    const similarity = compareWords(reference, subject);
                    if(similarity >= max) {
                        current = {subject: subject, similarity: max};
                        return true;
                    }
                    if(similarity > current.similarity) {
                        current = {subject: subject, similarity: similarity};
                    }
                    return false;
                })
                scores += current.similarity
            })
            
            if(filterAlphanumeric(item.title).toLowerCase().includes(filterAlphanumeric(query).toLowerCase())) {
                scores *= 1.5
                if(item.title.toLowerCase().includes(query.toLowerCase())) {
                    scores *= 1.5
                }
            }

            const max = references.map(reference => {
                return reference.length;
            }).reduce((a, b) => { return a + b} )
            
            if(results[item.url]) {
                results[item.url].relevance = Math.max(results[item.url].relevance, scores/max)
            } else {
                results[item.url] = {
                    relevance: scores/max,
                    item: item
                }
            }
        })
    })

    callback(Object.values(results).sort((a, b) => {
        return b.relevance - a.relevance
    }));
}

const searchUpdateUI = (query) => {
    if(query.length > 0) {
        search(query, (results) => {
            searchUI.results = []
            results.splice(5)
            results.forEach(result => {
                searchUI.results.push({
                    course: {
                        name: result.item.course.name,
                        color: result.item.course.color
                    },
                    name: result.item.title,
                    locations: result.item.locations
                })
                searchUI.buildResults()
            })
        });
    } else {
        searchUI.results = []
        searchUI.buildResults()
    }
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

        this.lastUISearch = ''

        setInterval(() => {
            const search = this.headerElementQueryWrapper.textContent + this.headerElementQueryRight.textContent;
            if(this.lastUISearch !== search) {
                searchUpdateUI(search);
                this.lastUISearch = search;
            }
        }, 250)

        this.selected = 0
    }

    addListeners() {
        document.addEventListener("keydown", (event) => {
            event = event || window.event;
            event.preventDefault()

            if(event.key === "Backspace") {
                if(this.headerElementQueryWrapper.textContent.length >= 1) this.headerElementQueryWrapper.textContent = this.headerElementQueryWrapper.textContent.substr(0, this.headerElementQueryWrapper.textContent.length - 1)
                this.headerElementQueryWrapper.style = '--data-caret-position:' + this.headerElementQueryWrapper.clientWidth + 'px;';
                this.buildAutocomplete()
            } else if(event.key.length === 1) {
                this.headerElementQueryWrapper.textContent += event.key;
                this.headerElementQueryWrapper.style = '--data-caret-position:' + this.headerElementQueryWrapper.clientWidth + 'px;';
                this.buildAutocomplete()
            } else if(event.key === "ArrowUp") {
                if(this.selected > 0) {
                    this.selected -= 1;
                    this.resultsElement.children[this.selected].classList.add('result-selected')
                    this.resultsElement.children[this.selected + 1].classList.remove('result-selected')
                    this.buildAutocomplete()
                } // do something
            } else if(event.key === "ArrowDown") {
                if(this.selected + 1 < this.results.length) {
                    this.selected += 1;
                    this.resultsElement.children[this.selected].classList.add('result-selected')
                    this.resultsElement.children[this.selected - 1].classList.remove('result-selected')
                    this.buildAutocomplete()
                } // do something
            } else if(event.key === "ArrowLeft") {
                if(this.headerElementQueryWrapper.textContent.length > 0) {
                    this.headerElementQueryRight.textContent = this.headerElementQueryWrapper.textContent.substr(-1) + this.headerElementQueryRight.textContent
                    this.headerElementQueryWrapper.textContent = this.headerElementQueryWrapper.textContent.substring(0, this.headerElementQueryWrapper.textContent.length - 1);
                    this.headerElementQueryWrapper.style = '--data-caret-position:' + this.headerElementQueryWrapper.clientWidth + 'px;';
                }
            } else if(event.key === "ArrowRight") {
                if(this.headerElementQueryRight.textContent.length > 0) {
                    this.headerElementQueryWrapper.textContent += this.headerElementQueryRight.textContent.substr(0,1);
                    this.headerElementQueryRight.textContent = this.headerElementQueryRight.textContent.substring(1);
                    this.headerElementQueryWrapper.style = '--data-caret-position:' + this.headerElementQueryWrapper.clientWidth + 'px;';
                }
            } else {
                console.log(event.key);
            }

            if(event.key === ' ') {
                searchUpdateUI(this.headerElementQueryWrapper.textContent + this.headerElementQueryRight.textContent)
                this.lastUISearch = this.headerElementQueryWrapper.textContent + this.headerElementQueryRight.textContent;
            }
        })
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
            this.headerElementQueryWrapper.innerText = 'Search'
            this.headerElementQueryWrapper.setAttribute('data-caret-position', '20px')
            
            this.headerElementQueryRight = document.createElement('div')
            this.headerElementQueryRight.className = 'canvasplus-search-ui-query-wrapper-right'
            this.headerElementQueryRight.innerText = ' Query'

            this.headerElementQueryAutoComplete = document.createElement('div')
            this.headerElementQueryAutoComplete.className = 'canvasplus-search-ui-query-wrapper-autocomplete'
            this.headerElementQueryAutoComplete.innerText = 'Autocomplete'

            this.headerElement.appendChild(this.headerElementIcon)
            this.headerElement.appendChild(this.headerElementQueryWrapper)
            this.headerElement.appendChild(this.headerElementQueryRight)
            this.headerElement.appendChild(this.headerElementQueryAutoComplete)
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

    buildAutocomplete() {
        const currentQuery = (this.headerElementQueryWrapper.textContent + this.headerElementQueryRight.textContent).toLowerCase()
        if(currentQuery.length === 0) { 
            this.headerElementQueryAutoComplete.textContent = 'Search your courses';
        }
        if(this.results.length > 0) {
            let newAutocomplete = '';
            const selected = this.results[this.selected];
            if(!selected) return;
            if(selected.name.toLowerCase().includes(currentQuery)) {
                newAutocomplete = selected.name.substr(selected.name.toLowerCase().lastIndexOf(currentQuery) + currentQuery.length)
            }
    
            this.headerElementQueryAutoComplete.textContent = newAutocomplete;
        }
    }

    buildResults() {
        this.buildAutocomplete()

        this.resultsElement.innerHTML = ''
        this.results.forEach((result, idx) => {
            this.resultsElement.appendChild(this.buildResult(result, idx))
        })
    }

    buildResult(result, idx) {
        const resultElement = document.createElement('div')
        resultElement.className = 'canvasplus-search-ui-results-single-result'
        
        if(idx === this.selected) {
            resultElement.classList.add('result-selected')
        }

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
    searchUI.addListeners()
    
main()