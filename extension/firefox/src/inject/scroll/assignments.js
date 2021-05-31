chrome.storage.local.get(["canvasplus-setting-smartscroll"], function(data) {
  if(data["canvasplus-setting-smartscroll"])
  {
    console.log("[Canvas+] Injecting Smart Scroll Buttons...");

    const moduleList = document.getElementById("context_modules");
    const app = document.getElementById("application");

    const headerBar = document.getElementsByClassName("header-bar")[0];

    const scrollDownButton = document.createElement("button");
    scrollDownButton.classList = ["btn", "cpx-scroll-down-button"];
    scrollDownButton.id = "cpx-scroll-down-button";
    scrollDownButton.innerHTML = '<i class="icon-arrow-down" role="presentation"></i> Scroll to Bottom';
    scrollDownButton.style.marginRight = "5px";
    headerBar.appendChild(scrollDownButton);

    scrollDownButton.addEventListener("click", function(){
      document.getElementsByClassName("collectionViewItems ig-list")[0].lastElementChild.getElementsByClassName("collectionViewItems ig-list draggable")[0].lastElementChild.scrollIntoView()
      this.blur();
    })

    document.getElementsByClassName("header-bar-left ic-Form-control assignment-search")[0].style.marginRight = "8px";

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
