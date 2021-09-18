const courseNames = {}
const searchLog = []

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
        if (window.location.pathname.split('/')[1] == "conversations") {
          document.getElementsByClassName("panel__secondary")[0].appendChild(searchWrapper);
        } else if (window.location.pathname.split('/')[1] == "calendar") {
          document.getElementById("right-side-wrapper").insertBefore(searchWrapper, document.getElementById("right-side-wrapper").firstChild);
          document.getElementById("right-side").style.marginTop = "24px";
        } else if (window.location.pathname == "/courses") {
          document.getElementsByClassName("header-bar")[0].children[0].style.display = "inline-block";
          document.getElementsByClassName("header-bar")[0].appendChild(searchWrapper);
          searchWrapper.style.display = "inline-block";
          searchWrapper.style.float = "right";
        } else if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "files") {
          document.getElementsByClassName("ic-app-nav-toggle-and-crumbs")[0].appendChild(searchWrapper);
        } else if (window.location.pathname == "/grades") {
          topNav.appendChild(searchWrapper);
          searchWrapper.style.marginInlineStart = "auto";
        } else if (typeof document.getElementsByClassName("not_found_page_artwork")[0] !== 'undefined' || typeof document.getElementsByClassName("ic-Error-page")[0] !== 'undefined') {
            console.log("[Canvas+] Not Injecting Search Due to 404 page");
            process.exit(1);
        } else {
          topNav.appendChild(searchWrapper);
        }
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

    fetch(getPathAPI('/api/v1/users/self/colors'), {
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
                if (query === "hawkins") {
                  /* from https://github.com/DavidLozzi/Stranger-Things-Easter-Egg */
                  window.upsideDown = (function () {
                  let music = {};
                  let body = {};
                  let originalBody = {};
                  let status = '';

                  const start = () => {
                    music = new Audio('https://raw.githubusercontent.com/DavidLozzi/Stranger-Things-Easter-Egg/master/music.mp3');
                    music.play();
                    status = 'started';

                    body = document.querySelectorAll("html")[0];
                    originalBody = { ...body };

                    body.style.background = 'radial-gradient(transparent, black), #C11B1F';
                    body.style.backgroundRepeat = 'no-repeat';
                    body.style.backgroundSize = 'cover';
                    body.style.overflow = 'hidden';

                    const fadeMusic = () => {
                      setTimeout(() => {
                        music.volume = Math.round(music.volume) > 0 ? music.volume - 0.1 : 0;
                        if (music.volume > 0) {
                          fadeMusic();
                        } else {
                          status = 'done';
                          stop()
                        }
                      }, 400);
                    };

                    window.setTimeout(() => {
                      status = 'running';
                      body.style.transition = 'all 10s ease 0s, transform 12s';
                      body.style.transform = 'rotate(180deg) scale(.9)';
                      body.style.filter = 'invert(1)';

                      window.setTimeout(() => {
                        fadeMusic();
                      }, 10500);
                    }, 1000);
                  };

                  const stop = () => {
                    music.pause();
                    music = null;
                    body.style = originalBody.style;
                    status = '';
                  };

                  const getStatus = () => {
                    return status;
                  };

                  return {
                    start,
                    stop,
                    getStatus
                  };
                }());
                window.upsideDown.start();
              };
                if (query == "rick") {
                  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                  search.value = "";
                };
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
    let courses = await fetch(getPathAPI('/api/v1/users/self/favorites/courses?include[]=term&exclude[]=enrollment'), {
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

    const searchCourseContinue = (id) => {
        searchPages(id).then(pages => {
            allItems = allItems.concat(pages)

            searchModules(id).then(modules => {
                allItems = allItems.concat(modules)
                i++


                document.getElementById('ic-app-class-search-progress').classList.remove('dont-round-borders')
                document.getElementById('ic-app-class-search-progress').style.width = (i / Object.values(courses).length * 100) + '%'
                document.getElementById('ic-app-class-search-progress').style.backgroundSize = (1500 / (i / Object.values(courses).length)) + "%"

                if(i >= Object.values(courses).length) {
                    injectSearchResults(allItems)
                }
            })
        })
    }

    let j = 0
    Object.values(courses).forEach(item => {
        chrome.storage.local.get('canvasplus-searchcache-v3-pages-' + item.id, pagesStorageObj => {
            let pagesStorage = pagesStorageObj['canvasplus-searchcache-v3-pages-' + item.id]

            chrome.storage.local.get('canvasplus-searchcache-v3-modules-' + item.id, modulesStorageObj => {
                let modulesStorage = modulesStorageObj['canvasplus-searchcache-v3-modules-' + item.id]

                let pagesSession = sessionStorage.getItem('canvasplus-searchcache-v3-pages-' + item.id)
                let modulesSession = sessionStorage.getItem('canvasplus-searchcache-v3-modules-' + item.id)

                if((pagesStorage || pagesSession) && (modulesStorage || modulesSession)) {
                    searchCourseContinue(item.id)
                } else {
                    setTimeout(() => {
                        searchCourseContinue(item.id)
                    }, j * 1000)
                }
                j++
            })
        })
    })
}

const doneSearchingCourses = (items) => {
    searchLog.push(items)
}

const searchPages = async (courseId, checkStorage) => {
    if(checkStorage === undefined) checkStorage = true

    let storageName = ('canvasplus-searchcache-v3-pages-' + courseId)

    if(checkStorage) {
        if(sessionStorage.getItem(storageName) !== null) {
            searchLog.push('Used session storage to get pages from course ' + courseId + ' ...')
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
            searchLog.push('Refreshing page index of course ' + courseId + ' ...')
            searchPages(courseId, false)
            return storageItem
        }
    }


    let pages = []
    let pageIndex = 1

    while(true) {
        // Get JSON from API
        data = await fetch(getPathAPI('/api/v1/courses/' + courseId + '/pages?per_page=100&page=' + pageIndex))
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

    searchLog.push('Done getting pages from course ' + courseId + ' ...')
    return pages
}

const searchModules = (courseId, checkStorage) => {
    if(checkStorage === undefined) checkStorage = true

    let storageName = ('canvasplus-searchcache-v3-modules-' + courseId)

    return new Promise((resolve, reject) => {
        const getModulesPage = (pageIndex, existing) => {
            fetch(getPathAPI('/api/v1/courses/' + courseId + '/modules?include=items&per_page=100&page=' + pageIndex)).then(output => {
                output.json().then(json => {
                    if(json.length < 100) {
                        existing = existing.concat(json)
                        let items = []
                        existing.forEach(module => {
                            module.items.forEach(item => {
                                let obj = {
                                    title: item.title,
                                    url: item.html_url,
                                    course: courseId
                                }
                                items.push(obj)
                            })
                        })

                        sessionStorage.setItem(storageName, JSON.stringify(items))
                        let storageChanges = {}
                        storageChanges[storageName] = items
                        chrome.storage.local.set(storageChanges)

                        searchLog.push('Done getting modules from course ' + courseId + ' ...')
                        resolve(items);
                    } else {
                        getModulesPage(pageIndex + 1, existing.concat(json))
                    }
                })
            })
        }

        if(checkStorage) {
            if(sessionStorage.getItem(storageName) !== null) {
                searchLog.push('Used session storage to get modules from course ' + courseId + ' ...')
                resolve(JSON.parse(sessionStorage.getItem(storageName)))
            }

            new Promise(resolve => {
                chrome.storage.local.get(storageName, output => {
                    resolve(output)
                })
            }).then(storageList => {
                let storageItem = storageList[storageName]

                if(storageItem) {
                    searchLog.push('Refreshing modules index of course ' + courseId + ' ...')
                    searchPages(courseId, false)
                    resolve(storageItem)
                }

                getModulesPage(1, [])
            })
        } else {
            getModulesPage(1, [])
        }
    })
}

chrome.storage.local.get(["canvasplus-setting-search"], function(data) {
    if(data["canvasplus-setting-search"])
    {
        console.log('[Canvas+] Injecting search bar ...\n \nNote: 404 errors in this window do not have an impact on the functionality of search.\n \nClick to see your search log. ', searchLog)
        runSearch()
    }
})
