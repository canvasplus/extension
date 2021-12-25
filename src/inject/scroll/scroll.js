useReactiveFeatures([{
  settingName: "canvasplus-setting-smartscroll",
  onChanged: (value) => {
    if(value === true) {
      const stub = document.createElement('div')
      stub.id = 'canvasplus-smartscroll-stub'
      
      const stubInner = document.createElement('div')
      stubInner.className = 'canvasplus-smartscroll-inner'

      stubInner.innerHTML = `
        <div class="cpx-smartscroll-button cpx-smartscroll-top">
          <i class="icon-arrow-up" role="presentation"></i>
        </div>
        
        <div class="cpx-smartscroll-button cpx-smartscroll-bottom">
          <i class="icon-arrow-down" role="presentation"></i>
        </div>

        <div class="cpx-smartscroll-button cpx-smartscroll-close">
          <i class="icon-end" role="presentation"></i>
        </div>
      `
      stub.appendChild(stubInner)

      document.body.appendChild(stub)
    } else {
      document.querySelector('#canvasplus-smartscroll-stub')?.remove()
    }
  }
}])
    