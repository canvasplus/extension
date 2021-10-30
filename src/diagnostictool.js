const preventClick = () => {e.preventDefault(); e.stopPropagation();}
document.body.addEventListener('click', preventClick);

const hoverBox = document.createElement("div");
hoverBox.style.position = "fixed";
hoverBox.style.background = "rgba(255, 0, 0, 0.25)";
hoverBox.style.border = "3px solid rgba(255, 0, 0, 0.7)";
hoverBox.style.pointerEvents = "none";
hoverBox.style.zIndex = 1000;
document.documentElement.appendChild(hoverBox);

const onscroll = () => { hoverBox.style.top = element.getBoundingClientRect().top +"px"; hoverBox.style.left = element.getBoundingClientRect().left + "px"; };
window.addEventListener("scroll", onscroll);

var element = [];
const mouseover = (e) => {
  element = e.target;
  hoverBox.style.width = e.target.getBoundingClientRect().width - 3 + "px";
  hoverBox.style.height = e.target.getBoundingClientRect().height - 3 + "px";
  hoverBox.style.top = e.target.getBoundingClientRect().top + "px";
  hoverBox.style.left = e.target.getBoundingClientRect().left + "px";
}
document.addEventListener("mouseover", mouseover);

const mousedown = () => { getstyles(element); document.body.removeEventListener('click', preventClick); hoverBox.remove(); document.removeEventListener("mouseover", mouseover); document.body.removeEventListener("mousedown", mousedown); }
document.body.addEventListener("mousedown", mousedown);

let array = [];
const getstyles = (selectedelement) => {
  const getstyleof = getComputedStyle(selectedelement);
  for (element of getstyleof) {
    if (getstyleof[element] != undefined && getstyleof[element] != "" && getstyleof[element] != "auto" && getstyleof[element] != "0px" && getstyleof[element] != "none" && getstyleof[element] != "auto") {
      array.element = element;
      array[element] = getstyleof[element];
    }
  }
  //output of diagtool
  console.log(array);
}