const courseNames = {}

const runSearch = () => {
    const search = injectSearchBox()

    getCoursesToSearch().then(courses => {
        searchCourses(courses)
    })

}

const injectSearchBox = () => {
    const wrapper = document.getElementById("wrapper");
    const topNav = wrapper.firstElementChild;

    const searchWrapper = document.createElement("div");
    searchWrapper.id = "ic-app-class-search-wrapper";

    const search = document.createElement("input");
    search.id = "ic-app-class-search";
    search.type = "search";
    search.placeholder = "Loading Search...";
    search.classList = "ic-app-class-search";
    search.autocomplete = "off";
    search.disabled = true;

    const searchProgress = document.createElement("span");
    searchProgress.id = "ic-app-class-search-progress";
    searchProgress.classList = "ic-app-class-search-progress";

    searchWrapper.appendChild(search);
    searchWrapper.appendChild(searchProgress);

    if(document.getElementById("dashboard_header_container") != null) // Sidebar is not exclusive to wrapper
    {
        searchWrapper.style.marginBottom = "40px";
        const sidebar = document.getElementById("right-side-wrapper");
        sidebar.insertBefore(searchWrapper, sidebar.firstChild);
    }
    else
    {
        topNav.appendChild(searchWrapper);
    }

    setTimeout(() => {
        if(document.body.contains(searchProgress)) {
        search.placeholder = "Search is taking longer than expected...";
        search.classList.add("taking-longer-than-expected")
        }
    }, 10000)
    setTimeout(() => {
        if(document.body.contains(searchProgress)) {
        search.placeholder = "Search may have failed. Try reloading.";
        }
    }, 20000)
    return search;
}

const injectSearchResults = (results) => {
    const wrapper = document.getElementById("wrapper");
    const topNav = wrapper.firstElementChild;

    const searchResults = document.createElement('div');
    searchResults.id = 'ic-app-class-search-results'
    searchResults.classList = 'ic-app-class-search-results'
    searchResults.innerHTML = ''

    if(document.getElementById("dashboard_header_container") != null)
    {
        searchResults.style.top = "70px";
        searchResults.style.right = "40px";
    }

    fetch('/api/v1/users/self/colors', {
        headers: {accept: "application/json, text/javascript, application/json+canvas-string-ids"}
    }).then(colors => {
        colors.json().then(colors => {
            let searchResultsCounter = document.createElement("b");
            searchResultsCounter.hidden = true;
            searchResultsCounter.id = "canvasplus-search-results-counter";
            searchResultsCounter.classList = "canvasplus-search-results-counter";
            searchResultsCounter.innerHTML = "??? Results";

            let searchResultsNoResults = document.createElement("div");
            searchResultsNoResults.hidden = true;
            searchResultsNoResults.id = "canvasplus-search-results-no-results";
            searchResultsNoResults.classList = "canvasplus-search-results-no-results";
            searchResultsNoResults.innerHTML = "<b class='canvasplus-search-results-no-results-header'>No Results</b><p class='canvasplus-search-results-no-results-description'>At this time, Canvas+ only searches your course pages and modules.</p>";

            searchResults.appendChild(searchResultsCounter);
            searchResults.appendChild(searchResultsNoResults);

            results.forEach(item => {
                const row = document.createElement('div')
                row.classList = 'canvasplus-search-results-list-item'
        
                const courseIndicator = document.createElement("p");
                courseIndicator.classList = "canvasplus-search-results-list-course-indicator";
                courseIndicator.style.color = colors.custom_colors['course_' + item.course];
                courseIndicator.innerHTML = courseNames[item.course];
        
                let link = document.createElement("a")
                link.classList = "ig-title title item_link";
                link.target = "_blank";
                link.rel = "noreferrer noopener";
                link.innerHTML = item.title;
                link.href = item.url;
        
                row.setAttribute("link-name", link.innerHTML);
                row.appendChild(courseIndicator);
                row.appendChild(link);
                
                item.element = row

                searchResults.appendChild(row)
            });
            topNav.appendChild(searchResults);

            let search = document.getElementById("ic-app-class-search")
            search.placeholder = 'Search'
            search.disabled = false
            search.classList.remove('taking-longer-than-expected')

            search.onblur = () => {
                searchResults.style.visibility = "hidden";
                searchResults.style.opacity = "0";
            }
      
            search.onfocus = () => {
                if(search.value.length > 0)
                {
                    searchResults.style.visibility = "visible";
                    searchResults.style.opacity = "1";
                }
            }

            search.onkeyup = () => {
                let query = search.value.toLowerCase()
                if(query.length == 0) {
                    searchResults.style.visibility = "hidden";
                    searchResults.style.opacity = "0";
                } else {
                    searchResults.style.visibility = "visible";
                    searchResults.style.opacity = "1";
                }
                let length = results.filter(item => {
                    if(item.title.toLowerCase().includes(query)) {
                        item.element.hidden = false
                        return true
                    } else {
                        item.element.hidden = true
                        return false
                    }
                }).length
                if(length > 0) {
                    searchResultsCounter.innerHTML = length + " Results"
                    searchResultsCounter.hidden = false
                    searchResultsNoResults.hidden = true
                } else {
                    searchResultsCounter.hidden = true
                    searchResultsNoResults.hidden = false
                }
            }

            searchResults.style.visibility = "hidden";
            searchResults.style.opacity = "0";

            setTimeout(() => {
                document.getElementById("ic-app-class-search-progress").classList.add("removing");
            }, 1000)
            setTimeout(() => {
                document.getElementById("ic-app-class-search-progress").remove();
            }, 1600)
        });
    });
}

const getCoursesToSearch = async () => {
    let courses = await fetch('/api/v1/users/self/favorites/courses?include[]=term&exclude[]=enrollment', {
        headers: {accept: "application/json, text/javascript, application/json+canvas-string-ids"}
    });
    courses = await courses.json();

    let output = {}

    courses.forEach(item => {
        output[item.id] = {
            id: item.id,
            name: item.name
        }
        if(item.name.length < 15) {
            courseNames[item.id] = item.name
        } else {
            courseNames[item.id] = item.name.substr(0, 12).trim() + "..."
        }
    })

    return output;
}

const searchCourses = (courses) => {
    let process = 0
    const searchStages = 1 // number of places that are search per course

    let items = []
    
    let i = 0
    let allItems = []

    Object.values(courses).forEach(item => {
        searchPages(item.id).then(pages => {
            allItems = allItems.concat(pages)

            searchModules(item.id).then(modules => {
                allItems = allItems.concat(modules)
                i++

                document.getElementById('ic-app-class-search-progress').classList.remove('dont-round-borders')
                document.getElementById('ic-app-class-search-progress').style.width = (i / Object.values(courses).length * 100) + '%'
                document.getElementById('ic-app-class-search-progress').style.backgroundSize = (1500 / (i / Object.values(courses).length)) + "%"

                if(i >= Object.values(courses).length) {
                    console.log("All done!")
                    console.log(allItems)
                    injectSearchResults(allItems)
                }
            })
        })
    })
}

const doneSearchingCourses = (items) => {
    console.log(items)
}

const searchPages = async (courseId) => {
    let storageName = ('canvasplus-searchcache-v3-pages-' + courseId)

    if(sessionStorage.getItem(storageName) !== null) {
        return JSON.parse(sessionStorage.getItem(storageName))
    }

    let getStorage = new Promise(resolve => {
        chrome.storage.local.get(storageName, output => {
            resolve(output)
        })
    })
    
    let storageList = await getStorage
    let storageItem = storageList[storageName]

    if(storageItem) {
        return storageItem
    }

    let pages = []
    let pageIndex = 1

    while(true) {
        // Get JSON from API
        data = await fetch('https://aisdblend.instructure.com/api/v1/courses/' + courseId + '/pages?per_page=100&page=' + pageIndex)
        data = await data.json()

        if(data.message === 'That page has been disabled for this course') {
            // Runs if pages feature is disabled
            break;
        } else {
            // Convert to small object and add to list

            data.forEach(item => {
                pages.push({
                    title: item.title,
                    url: item.html_url,
                    course: courseId
                })
            })

            // Runs if there are no more pages
            if(data.length < 100) {
                break;
            }
        }

        pageIndex += 1 // "Turn" the page
    }
    
    sessionStorage.setItem(storageName, JSON.stringify(pages))
    let storageChanges = {}
    storageChanges[storageName] = pages
    chrome.storage.local.set(storageChanges)

    return pages
}

const searchModules = (courseId) => {
    
    let storageName = ('canvasplus-searchcache-v3-modules-' + courseId)

    return new Promise((resolve, reject) => {
        const getModulesPage = (pageIndex, existing) => {
            fetch('https://aisdblend.instructure.com/api/v1/courses/' + courseId + '/modules?per_page=100&page=' + pageIndex).then(output => {
                output.json().then(json => {
                    if(json.length < 100) {
                        done(existing.concat(json))
                    } else {
                        getModulesPage(pageIndex + 1, existing.concat(json))
                    }
                })
            })
        }
    
        const done = (modules) => {
            let i = 0
            let items = []
    
            const interval = setInterval(async() => {
                let item = modules[i]
                i++
                
                if(modules.length <= i) {
                    clearInterval(interval)
                    if(item === undefined) {
                        resolve(items)
                        return    
                    }

                    data = await fetch(item.items_url)
                    data = await data.json()
                    data.forEach(page => {
                        let obj = {
                            title: page.title,
                            url: page.html_url,
                            course: courseId
                        }
                        items.push(obj)
                    })
                    
                    sessionStorage.setItem(storageName, JSON.stringify(items))
                    let storageChanges = {}
                    storageChanges[storageName] = items
                    chrome.storage.local.set(storageChanges)

                    resolve(items)
                } else {
                    data = await fetch(item.items_url)
                    data = await data.json()
                    data.forEach(page => {
                        let obj = {
                            title: page.title,
                            url: page.html_url,
                            course: courseId
                        }
                        items.push(obj)
                    })
                }
            }, 100)
        }

        if(sessionStorage.getItem(storageName) !== null) {
            resolve(JSON.parse(sessionStorage.getItem(storageName)))
        }

        new Promise(resolve => {
            chrome.storage.local.get(storageName, output => {
                resolve(output)
            })
        }).then(storageList => {
            let storageItem = storageList[storageName]
    
            if(storageItem) {
                resolve(storageItem)
            }
    
            getModulesPage(1, [])
        })
    })
}

chrome.storage.local.get(["canvasplus-setting-search"], function(data) {
    if(data["canvasplus-setting-search"])
    {
        runSearch()
    }
    else runSearch() // TEMP
})