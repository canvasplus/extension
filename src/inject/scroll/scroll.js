useReactiveFeatures([{
  settingName: "canvasplus-setting-smartscroll",
  onChanged: (value) => {
    if(value === true) {
      const scroll = (direction) => {
        window.scrollTo(0, direction == "up" ? 0 : document.body.scrollHeight);
      };

      const stub = document.createElement('div');
        stub.id = 'smartscroll-padding';
        stub.innerHTML = `
          <div id="smartscroll-stub">
            <div class="smartscroll-button" id="smartscroll-top">
              <i class="icon-arrow-up icon-arrow" role="presentation"></i>
            </div>
            <div class="smartscroll-button" id="smartscroll-bottom">
              <i class="icon-arrow-down icon-arrow" role="presentation"></i>
            </div>
          </div>`;
      document.body.appendChild(stub);

      document.querySelectorAll('.smartscroll-button').forEach(el => {el.addEventListener('click', () => { scroll(el.id == "smartscroll-bottom" ? "down" : "up"); })});
    } else {
      document.querySelector('#smartscroll-stub')?.remove();
    }
  }
}])
    