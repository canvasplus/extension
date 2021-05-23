
chrome.storage.local.get(['canvasplus-display-appearance'], function(data) {
    var link = document.createElement("link");
    link.href = chrome.extension.getURL("src/inject/colors/canvas-dark.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.setAttribute("class", "cpt-iframe-style")
    if(data["canvasplus-display-appearance"] == "dark") document.addEventListener("scroll", function() {
        if(document.getElementsByClassName("tox-edit-area__iframe").length > 0) {
          for(let iframeWrapper of document.getElementsByClassName("tox-edit-area__iframe")) {
            if(iframeWrapper.getAttribute("cpt-style-applied") == null) {
            iframeWrapper.contentDocument.body.onclick = function() {
                if(iframeWrapper.contentDocument.getElementsByTagName("head")[0].getElementsByClassName("cpt-iframe-style").length == 0) {
                    iframeWrapper.contentDocument.getElementsByTagName("head")[0].appendChild(link);
                }
              }
              iframeWrapper.setAttribute("cpt-style-applied", true)
            }
          }

        }
    });
});
