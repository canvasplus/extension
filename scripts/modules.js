
const html = document.getElementsByTagName("html")[0];
html.style.scrollBehavior = "smooth"; // For smoothness in scrollToBottom()

const moduleList = document.getElementById("context_modules");

// Getting the parent element this way as it is the least likely to change after a canvas update
const firstButton = document.getElementById("expand_collapse_all");
const headerBar = firstButton.parentElement;

const scrollDownButton = document.createElement("button");
scrollDownButton.classList = ["btn"];
scrollDownButton.id = "canvas_plus_scroll_down";
scrollDownButton.innerHTML = '<i class="icon-arrow-down" role="presentation"></i> Scroll to Bottom';
scrollDownButton.style.marginRight = "5px";
headerBar.insertBefore(scrollDownButton, firstButton);

scrollDownButton.addEventListener("click", function(){
  var lastPublished = null;
  for(canvasModule of moduleList.children){
    if(!canvasModule.classList.contains("locked")) lastPublished = canvasModule;
  }

  lastPublished.scrollIntoView();
})
