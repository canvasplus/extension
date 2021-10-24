$("body").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
});
const hoverBox = document.createElement("div");
hoverBox.style.position = "fixed";
hoverBox.style.background = "rgba(255, 0, 0, 0.25)";
hoverBox.style.border = "3px solid rgba(255, 0, 0, 0.7)";
hoverBox.style.pointerEvents = "none";
hoverBox.style.zIndex = 1000;
var element = []
document.documentElement.appendChild(hoverBox);
document.addEventListener("click", () => {console.log(element)})
document.addEventListener("mouseover", (e) => {
    element = e.target
    hoverBox.style.width = e.target.getBoundingClientRect().width + 3 + "px";
    hoverBox.style.height = e.target.getBoundingClientRect().height + 3 * 2 + "px";
    hoverBox.style.top = e.target.getBoundingClientRect().top - 3 + "px";
    hoverBox.style.left = e.target.getBoundingClientRect().left - 3 + "px";
    window.addEventListener("scroll", () => {
        hoverBox.style.top = e.target.getBoundingClientRect().top - 3 + "px";
        hoverBox.style.left = e.target.getBoundingClientRect().left - 3 + "px";
    })
});
