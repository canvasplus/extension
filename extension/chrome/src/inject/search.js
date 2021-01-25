if(document.getElementById("wrapper").firstElementChild.classList == "ic-app-nav-toggle-and-crumbs no-print" || document.getElementById("dashboard_header_container") != null) {

  console.log("Injecting Search Bar...");
  let previous = [];
  let allLinks = [];

  let search = inject();
  let searchResultsElement;
  let searchResultsCounterElement;
  let searchResultsNoResultsElement;
  let searchReady = false;

  prepare();

  async function prepare()
  {
    let entries = {};
    let links = [];

    let courses = await fetch('/api/v1/users/self/favorites/courses?include[]=term&exclude[]=enrollment', {
          headers: {accept: "application/json, text/javascript, application/json+canvas-string-ids"}
    });
    courses = await courses.json();

    let colors = await fetch('/api/v1/users/self/colors', {
          headers: {accept: "application/json, text/javascript, application/json+canvas-string-ids"}
    });
    colors = await colors.json();
    colors = await colors.custom_colors;

    for(course of courses)
    {
      let id = course.id;
      let name = course.name;
      let color = colors["course_" + id]

      if(sessionStorage.getItem("canvasplus-searchIndex-modules-course_" + id) != null)
      {
        let modules = JSON.parse(sessionStorage.getItem("canvasplus-searchIndex-modules-course_" + id));
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

          allLinks.push(formatted);
          links.push(formatted);
        }

        let entry = {"id": id, "color": color, "modules": links};
        entries[id] = entry;

        if(Object.keys(entries).length >= courses.length) {
          injectResults()
          return entries;
        }
      }
      else
      {
        getModules(id).then(output => {
          let tempDiv = document.createElement("div");
          tempDiv.innerHTML = output.modules;

          let compressed = [];

          for(link of tempDiv.getElementsByClassName("ig-title title item_link")){
            link.target = "_blank";
            link.rel = "noreferrer noopener";

            let formatted = document.createElement("div");
            formatted.classList = "canvasplus-search-results-list-item";

            let courseIndicator = document.createElement("p");
            courseIndicator.classList = "canvasplus-search-results-list-course-indicator";
            courseIndicator.style.color = color;
            courseIndicator.innerHTML = name;

            formatted.setAttribute("link-name", link.innerHTML);
            formatted.appendChild(courseIndicator);
            formatted.appendChild(link);

            allLinks.push(formatted);
            links.push(formatted);

            compressed.push({"name": link.innerHTML, "href": link.href});
          }

          sessionStorage.setItem("canvasplus-searchIndex-modules-course_" + id, JSON.stringify(compressed));

          let entry = {"id": id, "color": color, "modules": links};
          entries[id] = entry;

          if(Object.keys(entries).length >= courses.length) {
            injectResults()
            return entries;
          }
        })
      }
    }
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

  function injectResults()
  {
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
    searchResultsNoResults.innerHTML = "<b class='canvasplus-search-results-no-results-header'>No Results</b><p class='canvasplus-search-results-no-results-description'>At this time, Canvas+ only searches your course modules.</p>";

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

  async function getModules(courseId) {
    let modules = await fetch('/courses/'+ course.id +'/modules')
    modules = await modules.text()
    let output = {"id": courseId, "modules": modules};
    return output;
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
