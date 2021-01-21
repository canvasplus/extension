const wrapper = document.getElementById("wrapper");
const topNav = wrapper.firstElementChild;
const tabs = document.createElement("div");
tabs.id = "ic-app-class-tabs";
tabs.classList = ["ic-app-class-tabs"];

async function searchModules(searchTerm)
{
  let tempDiv = document.createElement("div")
  let total = 0;
  let results = [];
  getCourseList().then(courses => {
    for(course of courses){
        getCourseModulesPage(course.id).then(modules => {
            tempDiv.innerHTML = modules;
            for(link of tempDiv.getElementsByClassName("ig-title title item_link")){
                if(link.innerHTML.includes(searchTerm)) {
                  results.push(link);
                }
                total += 1;
            }
        })
    }
  })
  return results;
}

async function getCourseList()
{
  let courses = await fetch('/api/v1/users/self/favorites/courses?include[]=term&exclude[]=enrollment', {
        headers: {accept: "application/json, text/javascript, application/json+canvas-string-ids"}
  });
  courses = await courses.json()
  return courses;
}

async function getCourseModulesPage(courseId)
{
   let modules = await fetch('/courses/'+ courseId +'/modules')
   modules = await modules.text()
   return modules;
}
