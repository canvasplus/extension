useReactiveFeatures([{
  settingName: "canvasplus-setting-smartscroll",
  onChanged: (data) => {
    if (data == true) {
      console.log("[Canvas+] Injecting Smart Scroll Buttons...");

      const scrollTop = () => {
        document.documentElement.scrollIntoView()
      }

      const scrollBottom = () => {
        window.scrollTo(0, document.body.scrollHeight)
      }

      let backToTopButton = document.createElement("button");
      backToTopButton.classList = ["btn"];
      backToTopButton.id = "scrollup";
      backToTopButton.innerHTML = '<i class="icon-arrow-open-up" role="presentation"></i> Back to Top';
      backToTopButton.onclick = () => {scrollTop();}

      document.documentElement.appendChild(backToTopButton)

      let backToBottomButton = document.createElement("button");
      backToBottomButton.classList = ["btn"];
      backToBottomButton.id = "scrolldown";
      backToBottomButton.innerHTML = '<i class="icon-arrow-down" role="presentation"></i></i> Scroll to Bottom';
      backToBottomButton.onclick = () => {scrollBottom();}

      if (document.getElementsByClassName("header-bar-right__buttons")[0]) {
        document.getElementsByClassName("header-bar-right__buttons")[0].insertBefore(backToBottomButton, document.getElementsByClassName("header-bar-right__buttons")[0].children[0])
      } else {
        document.getElementsByClassName("ic-app-nav-toggle-and-crumbs")[0].insertBefore(backToBottomButton, document.getElementsByClassName("right-of-crumbs")[0])
        backToBottomButton.float = "right";
      }

      if (document.documentElement.scrollTop > 100) {
        backToTopButton.style.visibility = "visible";
        backToTopButton.style.opacity = "1";
      }

      window.onscroll = () => {
        if (document.documentElement.scrollTop > 100) {
          backToTopButton.style.visibility = "visible";
          backToTopButton.style.opacity = "1";
          backToTopButton.style.bottom = (document.documentElement.scrollHeight - window.innerHeight - window.scrollY) < 83 ? (83 - (document.documentElement.scrollHeight - window.innerHeight - window.scrollY)) + "px" : "";
        } else {
          backToTopButton.style.visibility = "";
          backToTopButton.style.opacity = "";
        }
      }
    } else {
      try {document.getElementById('scrolldown').remove();} catch {}
      try {document.getElementById('scrollup').remove();} catch {}
    }}
}])
    