chrome.storage.local.get(["canvasplus-setting-search"], function(data) {
  if(data["canvasplus-setting-search"])
  {
    if(document.getElementById("wrapper").firstElementChild.classList == "ic-app-nav-toggle-and-crumbs no-print" || document.getElementById("dashboard_header_container") != null) {

      console.log("[Canvas+] Injecting Search Bar...");
      var previous = [];
      var allLinks = [];

      let search = inject();
      let searchResultsElement;
      let searchResultsCounterElement;
      let searchResultsNoResultsElement;
      let searchReady = false;

      var entries = {};

      prepare();

      async function prepare()
      {
            let courses = await fetch('/api/v1/users/self/favorites/courses?include[]=term&exclude[]=enrollment', {
                  headers: {accept: "application/json, text/javascript, application/json+canvas-string-ids"}
            });
            courses = await courses.json();

            let colors = await fetch('/api/v1/users/self/colors', {
                  headers: {accept: "application/json, text/javascript, application/json+canvas-string-ids"}
            });
            colors = await colors.json();
            colors = await colors.custom_colors;

            for(let course of courses)
            {
              course.color = colors["course_" + course.id];
              loadCourse(course, courses.length);
            }
      }

      async function loadCourse(course, courses) {
        let id = course.id;
        let name = course.name;
        let color = course.color;
        let pages = await loadPages(id, name, color);
        let modules = await loadModules(id, name, color, pages);
        let entry = {"id": id, "color": color, "pages": pages, "modules": modules};
        entries[entry.id] = entry;
        if(Object.keys(entries).length >= courses) {
            console.log(entries);
            injectResults(entries);
            return entries;
        }
      }

      async function loadModules(id, name, color, pages) {
        let courseId = id;
        let links = [];
        if(sessionStorage.getItem("canvasplus-searchIndex-modules-course_" + courseId) != null)
        {
          let modules = JSON.parse(sessionStorage.getItem("canvasplus-searchIndex-modules-course_" + courseId)).modules;
          for(linkData of modules)
          {
            let formatted = document.createElement("div");
            formatted.classList = "canvasplus-search-results-list-item";

            let courseIndicator = document.createElement("p");
            courseIndicator.classList = "canvasplus-search-results-list-course-indicator";
            courseIndicator.style.color = color;
            courseIndicator.innerHTML = name;

            let link = document.createElement("a")
            link.classList = "ig-title title item_link";
            link.target = "_blank";
            link.rel = "noreferrer noopener";
            link.innerHTML = linkData.title;
            link.href = linkData["html_url"];

            formatted.setAttribute("link-name", link.innerHTML);
            formatted.appendChild(courseIndicator);
            formatted.appendChild(link);

            links.push(formatted);
          }

          return links;
        }
        else
        {
          let p = new Promise(function(resolve, reject) {
            chrome.storage.local.get(['canvasplus-search-modules-cache'], function(data) {
              resolve(data)
            })
          })
          let data = await p;
          if(Object.entries(data) > 0) {
            let toChange = {};
            toChange['canvasplus-search-modules-cache'] = data;
            chrome.storage.local.set(toChange);

            sessionStorage.setItem("canvasplus-searchIndex-modules-course_" + courseId, JSON.stringify(data));

            return loadModules(id, name, color);
          } else {
            // var p = new Promise(function(resolve, reject){
            //   chrome.storage.sync.get({"disableautoplay": true}, function(options){
            //     resolve(options.disableautoplay);
            //   })
            // });
            //
            // const configOut = await p;
            // console.log(p);
            //let e = await getModules(courseId);
            //console.log(e);
            let output = await getModules(courseId);
            // console.log(output);
            // let compressed = [];
            // if(output.modules.length >= 1) for(page of output.modules) {
            //   let formatted = document.createElement("div");
            //   formatted.classList = "canvasplus-search-results-list-item";
            //
            //   let courseIndicator = document.createElement("p");
            //   courseIndicator.classList = "canvasplus-search-results-list-course-indicator";
            //   courseIndicator.style.color = color;
            //   courseIndicator.innerHTML = name;
            //
            //   let link = document.createElement("a")
            //   link.classList = "ig-title title item_link";
            //   link.target = "_blank";
            //   link.rel = "noreferrer noopener";
            //   link.innerHTML = page.name;
            //   link.href = page["items_url"];
            //
            //   formatted.setAttribute("link-name", link.innerHTML);
            //   formatted.appendChild(courseIndicator);
            //   formatted.appendChild(link);
            //
            //   links.push(formatted);
            //
            //   compressed.push({"name": page.title, "href": page["html_url"]});
            // }
            //
            // let toChange = {};
            // toChange['canvasplus-search-modules-cache'] = compressed;
            // chrome.storage.local.set(toChange);
            console.log(output);
            sessionStorage.setItem("canvasplus-searchIndex-modules-course_" + courseId, JSON.stringify(output));
            let m = await loadModules(id, name, color);
            console.log(m);
            return m;
            //return links;
          }
          // return getModules(courseId).then(output => {
          //   let tempDiv = document.createElement("div");
          //   tempDiv.innerHTML = output.modules;
          //
          //   let compressed = [];
          //
          //   for(link of tempDiv.getElementsByClassName("ig-title title item_link")){
          //     link.target = "_blank";
          //     link.rel = "noreferrer noopener";
          //
          //     let formatted = document.createElement("div");
          //     formatted.classList = "canvasplus-search-results-list-item";
          //
          //     let courseIndicator = document.createElement("p");
          //     courseIndicator.classList = "canvasplus-search-results-list-course-indicator";
          //     courseIndicator.style.color = color;
          //     courseIndicator.innerHTML = name;
          //
          //     formatted.setAttribute("link-name", link.innerHTML);
          //     formatted.appendChild(courseIndicator);
          //     formatted.appendChild(link);
          //
          //     links.push(formatted);
          //
          //     compressed.push({"name": link.innerHTML, "href": link.href});
          //   }
          //
          //   sessionStorage.setItem("canvasplus-searchIndex-modules-course_" + courseId, JSON.stringify(compressed));
          //
          //   return links;
          // })
        }
      }

      async function loadPages(id, name, color) {
        let links = [];
        let courseId = id;

        if(sessionStorage.getItem("canvasplus-searchIndex-pages-course_" + courseId) != null)
        {
          let modules = JSON.parse(sessionStorage.getItem("canvasplus-searchIndex-pages-course_" + courseId));
          for(linkData of modules)
          {
            let formatted = document.createElement("div");
            formatted.classList = "canvasplus-search-results-list-item";

            let courseIndicator = document.createElement("p");
            courseIndicator.classList = "canvasplus-search-results-list-course-indicator";
            courseIndicator.style.color = color;
            courseIndicator.innerHTML = name;

            let link = document.createElement("a")
            link.classList = "ig-title title item_link";
            link.target = "_blank";
            link.rel = "noreferrer noopener";
            link.innerHTML = linkData.name;
            link.href = linkData.href;

            formatted.setAttribute("link-name", link.innerHTML);
            formatted.appendChild(courseIndicator);
            formatted.appendChild(link);

            links.push(formatted);
          }

          return links;
        }
        else
        {
          let p = new Promise(function(resolve, reject) {
            chrome.storage.local.get(['canvasplus-search-cache'], function(data) {
              resolve(data)
            })
          })
          let cache = await p;
          if(Object.entries(data) > 0) {
              let toChange = {};
              toChange['canvasplus-search-cache'] = data;
              chrome.storage.local.set(toChange);

              sessionStorage.setItem("canvasplus-searchIndex-pages-course_" + courseId, JSON.stringify(data));

              return loadPages(id, name, color);
          } else {
            return getPages(courseId).then(output => {
              let compressed = [];
              if(output.modules.length >= 1) for(page of output.modules) {
                let formatted = document.createElement("div");
                formatted.classList = "canvasplus-search-results-list-item";

                let courseIndicator = document.createElement("p");
                courseIndicator.classList = "canvasplus-search-results-list-course-indicator";
                courseIndicator.style.color = color;
                courseIndicator.innerHTML = name;

                let link = document.createElement("a")
                link.classList = "ig-title title item_link";
                link.target = "_blank";
                link.rel = "noreferrer noopener";
                link.innerHTML = page.title;
                link.href = page["html_url"];

                formatted.setAttribute("link-name", link.innerHTML);
                formatted.appendChild(courseIndicator);
                formatted.appendChild(link);

                links.push(formatted);

                compressed.push({"name": page.title, "href": page["html_url"]});
              }

              let toChange = {};
              toChange['canvasplus-search-cache'] = compressed;
              chrome.storage.local.set(toChange);

              sessionStorage.setItem("canvasplus-searchIndex-pages-course_" + courseId, JSON.stringify(compressed));

              return links;
            })
          }
        };
      }

      function inject()
      {
        const wrapper = document.getElementById("wrapper");
        const topNav = wrapper.firstElementChild;

        const search = document.createElement("input");
        search.id = "ic-app-class-search";
        search.type = "search";
        search.placeholder = "Loading Search...";
        search.classList = "ic-app-class-search";
        search.autocomplete = "off";
        search.disabled = true;

        if(document.getElementById("dashboard_header_container") != null) // Sidebar is not exclusive to wrapper
        {
          search.style.marginBottom = "40px";
          const sidebar = document.getElementById("right-side-wrapper");
          sidebar.insertBefore(search, sidebar.firstChild);
        }
        else
        {
          topNav.appendChild(search);
        }
        return search;
      }

      function injectResults(entries)
      {
        console.log(entries);
        for(let entry of Object.values(entries)){
          allLinks = allLinks.concat(entry.modules, entry.pages);
        }
        console.log(allLinks);
        const wrapper = document.getElementById("wrapper");
        const topNav = wrapper.firstElementChild;

        const searchResults = document.createElement("div");
        searchResults.hidden = true;
        searchResults.id = "ic-app-class-search-results";
        searchResults.classList = "ic-app-class-search-results";
        searchResults.innerHTML = ""
        if(document.getElementById("dashboard_header_container") != null)
        {
          searchResults.style.top = "70px";
          searchResults.style.right = "40px";
        }

        const searchResultsCounter = document.createElement("b");
        searchResultsCounter.hidden = true;
        searchResultsCounter.id = "canvasplus-search-results-counter";
        searchResultsCounter.classList = "canvasplus-search-results-counter";
        searchResultsCounter.innerHTML = "??? Results";

        const searchResultsNoResults = document.createElement("div");
        searchResultsNoResults.hidden = true;
        searchResultsNoResults.id = "canvasplus-search-results-no-results";
        searchResultsNoResults.classList = "canvasplus-search-results-no-results";
        searchResultsNoResults.innerHTML = "<b class='canvasplus-search-results-no-results-header'>No Results</b><p class='canvasplus-search-results-no-results-description'>At this time, Canvas+ only searches your course pages and modules.</p>";

        searchResults.appendChild(searchResultsCounter);
        searchResults.appendChild(searchResultsNoResults);
        topNav.appendChild(searchResults);

        for(link of allLinks)
        {
          searchResults.appendChild(link);
        }

        search.placeholder = "Search";

        search.onblur = function () {
          searchResultsElement.style.visibility = "hidden";
          searchResultsElement.style.opacity = "0";
        }

        searchResultsElement = searchResults;
        searchResultsCounterElement = searchResultsCounter;
        searchResultsNoResultsElement = searchResultsNoResults;

        search.onfocus = function () {
          if(search.value.length > 0)
          {
            searchResultsElement.style.visibility = "visible";
            searchResultsElement.style.opacity = "1";
          }
        }

        search.onkeyup = function () {
          updateSearchResults();
        }

        if(document.activeElement == search && search.value.length > 0) searchResults.hidden = false;
        ready = true;
        search.disabled = false;
      }

      async function checkPagesAvailable(courseId) {
        let pages = await fetch('/api/v1/courses/'+ courseId +'/pages')
        pages = await pages.text()
        let output = false;
        if(pages == 'while(1);{"message":"That page has been disabled for this course"}') output = false;
        else output = true;
        return output;
      }

      async function getPages(courseId) {
        let output = await checkPagesAvailable(courseId);
          if(output)
          {
            let pagesFinal = [];
            let page = 1;
            while(true)
            {
              if(page >= 10) break;
              let pages = await fetch('/api/v1/courses/'+ courseId +'/pages?per_page=100&page=' + page)
              if(!pages.ok) break;
              pages = await pages.json();
              pagesFinal = pagesFinal.concat(pages);
              if(pages.length < 100) break;
              else page++;
            }
            let output = {"id": courseId, "modules": pagesFinal};
            return output;
          }
          else {
            return {"id": courseId, "modules": {}};
          }
      }

      async function getModules(courseId) {
        let modulesFinal = [];
        let page = 1;
        while(true)
        {
          if(page >= 10) break;
          let pages = await fetch('/api/v1/courses/'+ courseId +'/modules?per_page=100&page=' + page)
          if(!pages.ok) break;
          pages = await pages.json();
          console.log(pages);
          modulesFinal = modulesFinal.concat(pages);
          if(pages.length < 100) break;
          else page++;
        }

        let p = new Promise(function(resolve, reject) {
          let pagesFinal = [];
          let i = 0;

          for(let mdl of modulesFinal) {
            getModule(mdl["items_url"]).then(mdlo => {
              pagesFinal = pagesFinal.concat(mdlo);
              i++
              if(i >= modulesFinal.length) {
                resolve(pagesFinal)
              }
            })
          }
        })

        let pagesFinal = await p;
        console.log(pagesFinal)

        let output = {"id": courseId, "modules": pagesFinal};
        console.log(output);
        return output;
      }

      async function getModule(link) {
        let pagesFinal = [];
        let page = 1;
        while(true)
        {
          if(page >= 10) break;
          let pages = await fetch(link + '?per_page=100&page=' + page)
          if(!pages.ok) break;
          pages = await pages.json();
          pagesFinal = pagesFinal.concat(pages);
          if(pages.length < 100) break;
          else page++;
        }
        return pagesFinal;
      }

      function updateSearchResults()
      {
        if(search.value.length > 0 && searchResultsElement.hidden)
        {
          searchResultsElement.hidden = false;
        }
        else if(search.value.length == 0 && !searchResultsElement.hidden)
        {
          searchResultsElement.hidden = true;
        }

        const searchTerm = search.value.toLowerCase();
        let matching = 0;
        for(link of allLinks)
        {
          if(link.getAttribute("link-name").toLowerCase().includes(searchTerm))
          {
            link.hidden = false;
            matching += 1;
          }
          else
          {
            link.hidden = true;
          }
        }
        if(matching > 0)
        {
          searchResultsNoResultsElement.hidden = true;

          searchResultsCounterElement.hidden = false;
          if(matching == 1) searchResultsCounterElement.innerHTML = "1 Result"
          else searchResultsCounterElement.innerHTML = matching + " Results"
        }
        else
        {
          searchResultsNoResultsElement.hidden = false;
          searchResultsCounterElement.hidden = true;
          searchResultsCounterElement.innerHTML = "??? Results"; // Prevent displaying incorrect number
        }
      }
    }
  }
});
