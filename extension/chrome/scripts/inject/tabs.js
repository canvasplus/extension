const wrapper = document.getElementById("wrapper");
const topNav = wrapper.firstElementChild;
const tabs = document.createElement("div");
tabs.classList = ["ic-app-class-tabs"];

if(sessionStorage.getItem("courseList") == null)
{
  getCourseList().then(courses => {
    sessionStorage.setItem("courseList", JSON.stringify(courses));
    for(course of courses)
    {
      const link = document.createElement("a");
      link.href = "/courses/" + course.id;
      link.innerHTML = "<span>" + course.name + "</span>";
      tabs.appendChild(link);
    }
    topNav.appendChild(tabs);
  });
}
else
{
  let courses = JSON.parse(sessionStorage.getItem("courseList"));
  console.log(courses);
  for(course of courses)
  {
    const link = document.createElement("a");
    link.href = "/courses/" + course.id;
    link.innerHTML = "<span>" + course.name + "</span>";
    tabs.appendChild(link);
  }
  topNav.appendChild(tabs);
}



async function getCourseList()
{
  let courses = await fetch('/api/v1/users/self/favorites/courses?include[]=term&exclude[]=enrollment', {
        headers: {accept: "application/json, text/javascript, application/json+canvas-string-ids"}
  });
  courses = await courses.json()
  return courses;
}
