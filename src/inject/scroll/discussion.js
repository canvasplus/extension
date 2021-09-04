chrome.storage.local.get(["canvasplus-setting-smartscroll"], function(data) {
  if(data["canvasplus-setting-smartscroll"])
  {
    console.log("[Canvas+] Injecting Smart Scroll Buttons...");

    const moduleList = document.getElementById("context_modules");
    const app = document.getElementById("application");

    // Getting the parent element this way as it is the least likely to change after a canvas update
    const firstButton = document.getElementsByClassName("btn topic-subscribe-button")[0];
    const headerBar = firstButton.parentElement;

    const scrollDownButton = document.createElement("button");
    scrollDownButton.classList = ["btn"];
    scrollDownButton.id = "canvas_plus_scroll_down";
    scrollDownButton.innerHTML = '<i class="icon-arrow-down" role="presentation"></i>';
    scrollDownButton.style.marginRight = "5px";
    headerBar.insertBefore(scrollDownButton, firstButton);

    scrollDownButton.addEventListener("click", function(){
      const bottom = document.getElementById("module_sequence_footer");
      bottom.scrollIntoView();
      this.blur();
    })

    const scrollUpButton = document.createElement("button");
    scrollUpButton.classList = ["btn"];
    scrollUpButton.id = "canvas_plus_scroll_up";
    scrollUpButton.innerHTML = '<i class="icon-arrow-up" role="presentation"></i>';
    scrollUpButton.style.marginRight = "5px";
    headerBar.insertBefore(scrollUpButton, scrollDownButton);

    scrollUpButton.addEventListener("click", function(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.blur()
    })
  }
});
