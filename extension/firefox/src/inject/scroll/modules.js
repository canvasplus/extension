chrome.storage.local.get(["canvasplus-setting-smartscroll"], function(data) {
  if(data["canvasplus-setting-smartscroll"])
  {
    console.log("[Canvas+] Injecting Smart Scroll Buttons...");

    const moduleList = document.getElementById("context_modules");
    const app = document.getElementById("application");

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

    const backToTopButton = document.createElement("button");
    backToTopButton.classList = ["btn"];
    backToTopButton.id = "canvas_plus_scroll_up";
    backToTopButton.innerHTML = '<i class="icon-arrow-open-up" role="presentation"></i> Back to Top';
    backToTopButton.style.marginRight = "5px";
    backToTopButton.style.position = "fixed";
    backToTopButton.style.marginRight = "5px";
    backToTopButton.style.zIndex = "101";
    backToTopButton.style.bottom = "10px";
    backToTopButton.style.right = "10px";
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.visibility = "visible";
      backToTopButton.style.opacity = "1";
    } else {
      backToTopButton.style.visibility = "hidden";
      backToTopButton.style.opacity = "0";
    }
    backToTopButton.style.transition = "visibility 0.3s, opacity 0.3s linear";
    app.insertBefore(backToTopButton, app.firstChild);

    backToTopButton.addEventListener("click", function(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.blur()
    })

    window.onscroll = function(){
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.visibility = "visible";
        backToTopButton.style.opacity = "1";
      } else {
        backToTopButton.style.visibility = "hidden";
        backToTopButton.style.opacity = "0";
      }
    }

  }
});
