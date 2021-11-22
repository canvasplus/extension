const sidebarColor = addStylingRule('')
const sidebarIconColor = addStylingRule('')
const sidebarActiveColor = addStylingRule('')
const sidebarActiveIconColor = addStylingRule('')
const sidebarIconWidth = addStylingRule('')
const sidebarIconHeight = addStylingRule('')

let sidebarlink = document.createElement("link");
  sidebarlink.href = chrome.extension.getURL("src/inject/sidebar/sidebar.css");
  sidebarlink.type = "text/css";
  sidebarlink.rel = "stylesheet";
  document.documentElement.appendChild(sidebarlink);

useReactiveFeatures([{
  settingName: 'canvasplus-setting-sidebar-color',
  onChanged: (value) => {
    sidebarColor.setRule('--sidebar-background-color: ' + ((value !== '') ? value : 'var(--ic-brand-global-nav-bgd)'))
  }
}, {
  settingName: 'canvasplus-setting-sidebar-icon-color',
  onChanged: (value) => {
    if(value !== 'unset') {
      sidebarIconColor.setRule('--ic-brand-global-nav-ic-icon-svg-fill: ' + value + '; --ic-brand-global-nav-menu-item__text-color: ' + value)
    } else {
      sidebarIconColor.setRule('')
    }
  }
}, {
  settingName: 'canvasplus-setting-active-sidebar-color',
  onChanged: (value) => {
    if(value.background === "blend") {
      sidebarActiveColor.setRule('--sidebar-active-background-color: var(--cpt-dark-background-color, #FFFFFF)')
    } else if(value.background === "darker") {
      sidebarActiveColor.setRule('--sidebar-active-background-color: rgba(0,0,0,0.2)')
    } else if(value.background === "white") {
      sidebarActiveColor.setRule('--sidebar-active-background-color: #FFFFFF')
    } else {
      sidebarActiveColor.setRule('--sidebar-active-background-color: ' + value.background)
    }

    if(value.icon === 'white') {
      sidebarActiveIconColor.setRule('--ic-brand-global-nav-ic-icon-svg-fill--active: #FFFFFF; --ic-brand-global-nav-menu-item__text-color--active: #FFFFFF')
    }
    else if(value.icon === 'black') {
      sidebarActiveIconColor.setRule('--ic-brand-global-nav-ic-icon-svg-fill--active: #1D1D21;  --ic-brand-global-nav-menu-item__text-color--active: #1D1D21')
    }
    else if(value.icon === 'unset') {
      sidebarActiveIconColor.setRule('')
    } else {
      sidebarActiveIconColor.setRule('--ic-brand-global-nav-ic-icon-svg-fill--active: ' + value.icon + ';  --ic-brand-global-nav-menu-item__text-color--active: ' + value.icon)
    }
  }
}, {
  settingName: 'canvasplus-setting-sidebar-smaller-icons',
  onChanged: (value) => {
    sidebarIconWidth.setRule(value ? '--sidebar-icon-width: 22px' : '')
  }
}, {
  settingName: 'canvasplus-setting-sidebar-more-spacing',
  onChanged: (value) => {
    sidebarIconHeight.setRule(value ? '--sidebar-icon-height: 0.75rem' : '')
  }
}, {
  settingName: 'canvasplus-setting-sidebar-show-settings',
  onChanged: (value) => {

  }
}])

delayedQuerySelector("#header .ic-app-header__main-navigation #menu.ic-app-header__menu-list #global_nav_conversations_link").then((element) => {
  const sidebar = document.querySelector("#header .ic-app-header__main-navigation #menu.ic-app-header__menu-list")

  const settings = document.createElement('li')
  settings.className = 'menu-item ic-app-header__menu-list-item'
  settings.innerHTML = '<button id="global_nav_settings_link" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920" class="ic-icon-svg menu-item__icon svg-icon-history" style="width: calc(var(--sidebar-icon-width, 26px) * 1.2) !important;"><defs><style>.cls-1{fill:none;stroke:var(--ic-brand-global-nav-ic-icon-svg-fill);stroke-miterlimit:10;stroke-width:100px;}</style></defs><g id="Layer_1" data-name="Layer 1"><path d="M1016,0H904C824.88,0,760.5,64.38,760.5,143.52V307.37a673.87,673.87,0,0,1,100-22.44V143.52A43.57,43.57,0,0,1,904,100h112a43.57,43.57,0,0,1,43.52,43.52V284.93a673.87,673.87,0,0,1,100,22.44V143.52C1159.5,64.38,1095.12,0,1016,0Z"></path><path d="M1059.5,1635.07v141.41A43.57,43.57,0,0,1,1016,1820H904a43.57,43.57,0,0,1-43.52-43.52V1635.07a673.87,673.87,0,0,1-100-22.44v163.85C760.5,1855.62,824.88,1920,904,1920h112c79.14,0,143.52-64.38,143.52-143.52V1612.63A673.87,673.87,0,0,1,1059.5,1635.07Z"></path><path d="M143.52,1059.5A43.57,43.57,0,0,1,100,1016V904a43.57,43.57,0,0,1,43.52-43.52H284.93a673.87,673.87,0,0,1,22.44-100H143.52C64.38,760.5,0,824.88,0,904v112c0,79.14,64.38,143.52,143.52,143.52H307.37a673.87,673.87,0,0,1-22.44-100Z"></path><path d="M1776.48,760.5H1612.63a673.87,673.87,0,0,1,22.44,100h141.41A43.57,43.57,0,0,1,1820,904v112a43.57,43.57,0,0,1-43.52,43.52H1635.07a673.87,673.87,0,0,1-22.44,100h163.85c79.14,0,143.52-64.38,143.52-143.52V904C1920,824.88,1855.62,760.5,1776.48,760.5Z"></path><path d="M1656.43,342.44l-79.17-79.17c-56-56-147-56-203,0l-94.1,94.1a677.9,677.9,0,0,1,86.61,54.81L1445,334a43.57,43.57,0,0,1,61.55,0l79.17,79.17a43.57,43.57,0,0,1,0,61.55l-78.16,78.16a674.33,674.33,0,0,1,54.85,86.56l94-94C1712.39,489.45,1712.39,398.4,1656.43,342.44Z"></path><path d="M555.35,1509.41,460.76,1604a43.57,43.57,0,0,1-61.55,0L320,1524.83a43.56,43.56,0,0,1,0-61.54l94-94A676.9,676.9,0,0,1,358.89,1283L249.33,1392.58c-56,56-56,147,0,203l79.17,79.17c56,56,147,56,203,0l110.79-110.79A677,677,0,0,1,555.35,1509.41Z"></path><path d="M563.47,281c-56-56-147-56-203,0l-79.17,79.17c-56,55.95-56,147,0,203l76.28,76.28a676.59,676.59,0,0,1,54.86-86.56L352,492.38a43.56,43.56,0,0,1,0-61.54l79.17-79.17a43.57,43.57,0,0,1,61.55,0l60.48,60.48a676.84,676.84,0,0,1,86.62-54.8Z"></path><path d="M1656.08,1392.58,1556,1292.44a675.81,675.81,0,0,1-56.31,85.12l85.73,85.73a43.56,43.56,0,0,1,0,61.54L1506.2,1604a43.56,43.56,0,0,1-61.54,0l-88.46-88.46a675.52,675.52,0,0,1-88.08,53.34L1374,1674.71c56,56,147,56,203,0l79.17-79.17C1712,1539.58,1712,1448.53,1656.08,1392.58Z"></path></g><g id="Layer_2" data-name="Layer 2"><path d="M1279.44,357.65q-26.62-14.16-54.61-26a675.7,675.7,0,0,0-166.07-46.46V386.45a574.84,574.84,0,0,1,100,26.63q13.66,5,27.12,10.68,9.6,4.07,19,8.44a577.49,577.49,0,0,1,89.55,51.87l71.61-71.61A675.7,675.7,0,0,0,1279.44,357.65Zm253.64,702.12a574.84,574.84,0,0,1-26.63,100q-5,13.67-10.68,27.12-6.84,16.17-14.58,31.81a578.24,578.24,0,0,1-53.67,87.75l71.38,71.38a679.17,679.17,0,0,0,135.43-318.06Zm78.81-299a682.7,682.7,0,0,0-24-66.08q-11.92-28.19-26.2-55a676,676,0,0,0-54.86-86.57l-71.6,71.6a577.43,577.43,0,0,1,51.93,89.51q4.48,9.62,8.63,19.42,5.68,13.46,10.68,27.12a574.84,574.84,0,0,1,26.63,100h101.25A673.87,673.87,0,0,0,1611.89,760.77ZM759.76,1507.48q-13.66-5-27.13-10.69-8.29-3.51-16.45-7.27a577.14,577.14,0,0,1-89.92-51.5l-71.66,71.66a677,677,0,0,0,86.91,54.51q25.47,13.39,52.17,24.7a681.91,681.91,0,0,0,66.08,24,671.36,671.36,0,0,0,100,22.44V1534.09A575.67,575.67,0,0,1,759.76,1507.48ZM1283.59,1444a579,579,0,0,1-91.32,50.09q-3.18,1.39-6.39,2.75-13.45,5.68-27.12,10.68a575.7,575.7,0,0,1-100,26.62v101.25a671.36,671.36,0,0,0,100-22.44,680.77,680.77,0,0,0,66.07-24q21.68-9.17,42.55-19.74a676.56,676.56,0,0,0,88.08-53.33Zm-851-235.09q-5.15-10.86-9.84-22-5.7-13.46-10.68-27.12a573.92,573.92,0,0,1-26.62-100H284.19a675.48,675.48,0,0,0,46.45,166.08q12.47,29.46,27.5,57.44a675.87,675.87,0,0,0,55.16,86.27L484.85,1298A575.8,575.8,0,0,1,432.58,1208.86ZM759.76,307.64a679.34,679.34,0,0,0-66.08,24q-27.95,11.82-54.56,26a674.64,674.64,0,0,0-86.62,54.8L624.1,484a577.57,577.57,0,0,1,89.57-51.85q9.39-4.38,19-8.42,13.46-5.7,27.13-10.69a575.7,575.7,0,0,1,100-26.62V285.2A673.87,673.87,0,0,0,759.76,307.64Zm-402.89,332q-14.3,26.83-26.23,55.05a675.48,675.48,0,0,0-46.45,166.08H385.44a573.92,573.92,0,0,1,26.62-100q5-13.66,10.68-27.12,4.15-9.84,8.66-19.48a577.7,577.7,0,0,1,51.93-89.49l-71.6-71.6A675.89,675.89,0,0,0,356.87,639.64Z"></path><circle class="cls-1" cx="960" cy="960" r="302"></circle></g></svg></div><div class="menu-item__text">Settings</div></button>'
  sidebar.appendChild(settings)
  settings.addEventListener('click', (e) => {
    window.open(chrome.extension.getURL('src/popup/popup.html'), "Popup", 'width=240px,height=400px,resizable=0,scrollbars=no,menubar=no,toolbar=no')
  })

  const search = document.createElement('li')
  search.className = 'menu-item ic-app-header__menu-list-item'
  search.id = 'sidebar-custom-menu-icon-search'
  search.innerHTML = '<button id="global_nav_settings_link" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920" class="ic-icon-svg menu-item__icon svg-icon-history" style="width: calc(var(--sidebar-icon-width, 26px) * 1.2) !important;"><defs><style>.cls-1{fill:none;stroke:var(--ic-brand-global-nav-ic-icon-svg-fill);stroke-miterlimit:10;stroke-width:100px;}</style></defs><g id="Layer_1" data-name="Layer 1"><path d="M1016,0H904C824.88,0,760.5,64.38,760.5,143.52V307.37a673.87,673.87,0,0,1,100-22.44V143.52A43.57,43.57,0,0,1,904,100h112a43.57,43.57,0,0,1,43.52,43.52V284.93a673.87,673.87,0,0,1,100,22.44V143.52C1159.5,64.38,1095.12,0,1016,0Z"></path><path d="M1059.5,1635.07v141.41A43.57,43.57,0,0,1,1016,1820H904a43.57,43.57,0,0,1-43.52-43.52V1635.07a673.87,673.87,0,0,1-100-22.44v163.85C760.5,1855.62,824.88,1920,904,1920h112c79.14,0,143.52-64.38,143.52-143.52V1612.63A673.87,673.87,0,0,1,1059.5,1635.07Z"></path><path d="M143.52,1059.5A43.57,43.57,0,0,1,100,1016V904a43.57,43.57,0,0,1,43.52-43.52H284.93a673.87,673.87,0,0,1,22.44-100H143.52C64.38,760.5,0,824.88,0,904v112c0,79.14,64.38,143.52,143.52,143.52H307.37a673.87,673.87,0,0,1-22.44-100Z"></path><path d="M1776.48,760.5H1612.63a673.87,673.87,0,0,1,22.44,100h141.41A43.57,43.57,0,0,1,1820,904v112a43.57,43.57,0,0,1-43.52,43.52H1635.07a673.87,673.87,0,0,1-22.44,100h163.85c79.14,0,143.52-64.38,143.52-143.52V904C1920,824.88,1855.62,760.5,1776.48,760.5Z"></path><path d="M1656.43,342.44l-79.17-79.17c-56-56-147-56-203,0l-94.1,94.1a677.9,677.9,0,0,1,86.61,54.81L1445,334a43.57,43.57,0,0,1,61.55,0l79.17,79.17a43.57,43.57,0,0,1,0,61.55l-78.16,78.16a674.33,674.33,0,0,1,54.85,86.56l94-94C1712.39,489.45,1712.39,398.4,1656.43,342.44Z"></path><path d="M555.35,1509.41,460.76,1604a43.57,43.57,0,0,1-61.55,0L320,1524.83a43.56,43.56,0,0,1,0-61.54l94-94A676.9,676.9,0,0,1,358.89,1283L249.33,1392.58c-56,56-56,147,0,203l79.17,79.17c56,56,147,56,203,0l110.79-110.79A677,677,0,0,1,555.35,1509.41Z"></path><path d="M563.47,281c-56-56-147-56-203,0l-79.17,79.17c-56,55.95-56,147,0,203l76.28,76.28a676.59,676.59,0,0,1,54.86-86.56L352,492.38a43.56,43.56,0,0,1,0-61.54l79.17-79.17a43.57,43.57,0,0,1,61.55,0l60.48,60.48a676.84,676.84,0,0,1,86.62-54.8Z"></path><path d="M1656.08,1392.58,1556,1292.44a675.81,675.81,0,0,1-56.31,85.12l85.73,85.73a43.56,43.56,0,0,1,0,61.54L1506.2,1604a43.56,43.56,0,0,1-61.54,0l-88.46-88.46a675.52,675.52,0,0,1-88.08,53.34L1374,1674.71c56,56,147,56,203,0l79.17-79.17C1712,1539.58,1712,1448.53,1656.08,1392.58Z"></path></g><g id="Layer_2" data-name="Layer 2"><path d="M1279.44,357.65q-26.62-14.16-54.61-26a675.7,675.7,0,0,0-166.07-46.46V386.45a574.84,574.84,0,0,1,100,26.63q13.66,5,27.12,10.68,9.6,4.07,19,8.44a577.49,577.49,0,0,1,89.55,51.87l71.61-71.61A675.7,675.7,0,0,0,1279.44,357.65Zm253.64,702.12a574.84,574.84,0,0,1-26.63,100q-5,13.67-10.68,27.12-6.84,16.17-14.58,31.81a578.24,578.24,0,0,1-53.67,87.75l71.38,71.38a679.17,679.17,0,0,0,135.43-318.06Zm78.81-299a682.7,682.7,0,0,0-24-66.08q-11.92-28.19-26.2-55a676,676,0,0,0-54.86-86.57l-71.6,71.6a577.43,577.43,0,0,1,51.93,89.51q4.48,9.62,8.63,19.42,5.68,13.46,10.68,27.12a574.84,574.84,0,0,1,26.63,100h101.25A673.87,673.87,0,0,0,1611.89,760.77ZM759.76,1507.48q-13.66-5-27.13-10.69-8.29-3.51-16.45-7.27a577.14,577.14,0,0,1-89.92-51.5l-71.66,71.66a677,677,0,0,0,86.91,54.51q25.47,13.39,52.17,24.7a681.91,681.91,0,0,0,66.08,24,671.36,671.36,0,0,0,100,22.44V1534.09A575.67,575.67,0,0,1,759.76,1507.48ZM1283.59,1444a579,579,0,0,1-91.32,50.09q-3.18,1.39-6.39,2.75-13.45,5.68-27.12,10.68a575.7,575.7,0,0,1-100,26.62v101.25a671.36,671.36,0,0,0,100-22.44,680.77,680.77,0,0,0,66.07-24q21.68-9.17,42.55-19.74a676.56,676.56,0,0,0,88.08-53.33Zm-851-235.09q-5.15-10.86-9.84-22-5.7-13.46-10.68-27.12a573.92,573.92,0,0,1-26.62-100H284.19a675.48,675.48,0,0,0,46.45,166.08q12.47,29.46,27.5,57.44a675.87,675.87,0,0,0,55.16,86.27L484.85,1298A575.8,575.8,0,0,1,432.58,1208.86ZM759.76,307.64a679.34,679.34,0,0,0-66.08,24q-27.95,11.82-54.56,26a674.64,674.64,0,0,0-86.62,54.8L624.1,484a577.57,577.57,0,0,1,89.57-51.85q9.39-4.38,19-8.42,13.46-5.7,27.13-10.69a575.7,575.7,0,0,1,100-26.62V285.2A673.87,673.87,0,0,0,759.76,307.64Zm-402.89,332q-14.3,26.83-26.23,55.05a675.48,675.48,0,0,0-46.45,166.08H385.44a573.92,573.92,0,0,1,26.62-100q5-13.66,10.68-27.12,4.15-9.84,8.66-19.48a577.7,577.7,0,0,1,51.93-89.49l-71.6-71.6A675.89,675.89,0,0,0,356.87,639.64Z"></path><circle class="cls-1" cx="960" cy="960" r="302"></circle></g></svg></div><div class="menu-item__text">Search</div></button>'
  sidebar.appendChild(search)

  const more = document.createElement('li')
  more.className = 'menu-item ic-app-header__menu-list-item cpx-outside-settings-drawer'
  more.id = 'sidebar-custom-menu-icon-more'
  more.innerHTML = '<button id="global_nav_settings_link" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920" class="ic-icon-svg menu-item__icon svg-icon-history" style="width: calc(var(--sidebar-icon-width, 26px) * 1.2) !important;"><defs><style>.cls-1{fill:none;stroke:var(--ic-brand-global-nav-ic-icon-svg-fill);stroke-miterlimit:10;stroke-width:100px;}</style></defs><g id="Layer_1" data-name="Layer 1"><path d="M1016,0H904C824.88,0,760.5,64.38,760.5,143.52V307.37a673.87,673.87,0,0,1,100-22.44V143.52A43.57,43.57,0,0,1,904,100h112a43.57,43.57,0,0,1,43.52,43.52V284.93a673.87,673.87,0,0,1,100,22.44V143.52C1159.5,64.38,1095.12,0,1016,0Z"></path><path d="M1059.5,1635.07v141.41A43.57,43.57,0,0,1,1016,1820H904a43.57,43.57,0,0,1-43.52-43.52V1635.07a673.87,673.87,0,0,1-100-22.44v163.85C760.5,1855.62,824.88,1920,904,1920h112c79.14,0,143.52-64.38,143.52-143.52V1612.63A673.87,673.87,0,0,1,1059.5,1635.07Z"></path><path d="M143.52,1059.5A43.57,43.57,0,0,1,100,1016V904a43.57,43.57,0,0,1,43.52-43.52H284.93a673.87,673.87,0,0,1,22.44-100H143.52C64.38,760.5,0,824.88,0,904v112c0,79.14,64.38,143.52,143.52,143.52H307.37a673.87,673.87,0,0,1-22.44-100Z"></path><path d="M1776.48,760.5H1612.63a673.87,673.87,0,0,1,22.44,100h141.41A43.57,43.57,0,0,1,1820,904v112a43.57,43.57,0,0,1-43.52,43.52H1635.07a673.87,673.87,0,0,1-22.44,100h163.85c79.14,0,143.52-64.38,143.52-143.52V904C1920,824.88,1855.62,760.5,1776.48,760.5Z"></path><path d="M1656.43,342.44l-79.17-79.17c-56-56-147-56-203,0l-94.1,94.1a677.9,677.9,0,0,1,86.61,54.81L1445,334a43.57,43.57,0,0,1,61.55,0l79.17,79.17a43.57,43.57,0,0,1,0,61.55l-78.16,78.16a674.33,674.33,0,0,1,54.85,86.56l94-94C1712.39,489.45,1712.39,398.4,1656.43,342.44Z"></path><path d="M555.35,1509.41,460.76,1604a43.57,43.57,0,0,1-61.55,0L320,1524.83a43.56,43.56,0,0,1,0-61.54l94-94A676.9,676.9,0,0,1,358.89,1283L249.33,1392.58c-56,56-56,147,0,203l79.17,79.17c56,56,147,56,203,0l110.79-110.79A677,677,0,0,1,555.35,1509.41Z"></path><path d="M563.47,281c-56-56-147-56-203,0l-79.17,79.17c-56,55.95-56,147,0,203l76.28,76.28a676.59,676.59,0,0,1,54.86-86.56L352,492.38a43.56,43.56,0,0,1,0-61.54l79.17-79.17a43.57,43.57,0,0,1,61.55,0l60.48,60.48a676.84,676.84,0,0,1,86.62-54.8Z"></path><path d="M1656.08,1392.58,1556,1292.44a675.81,675.81,0,0,1-56.31,85.12l85.73,85.73a43.56,43.56,0,0,1,0,61.54L1506.2,1604a43.56,43.56,0,0,1-61.54,0l-88.46-88.46a675.52,675.52,0,0,1-88.08,53.34L1374,1674.71c56,56,147,56,203,0l79.17-79.17C1712,1539.58,1712,1448.53,1656.08,1392.58Z"></path></g><g id="Layer_2" data-name="Layer 2"><path d="M1279.44,357.65q-26.62-14.16-54.61-26a675.7,675.7,0,0,0-166.07-46.46V386.45a574.84,574.84,0,0,1,100,26.63q13.66,5,27.12,10.68,9.6,4.07,19,8.44a577.49,577.49,0,0,1,89.55,51.87l71.61-71.61A675.7,675.7,0,0,0,1279.44,357.65Zm253.64,702.12a574.84,574.84,0,0,1-26.63,100q-5,13.67-10.68,27.12-6.84,16.17-14.58,31.81a578.24,578.24,0,0,1-53.67,87.75l71.38,71.38a679.17,679.17,0,0,0,135.43-318.06Zm78.81-299a682.7,682.7,0,0,0-24-66.08q-11.92-28.19-26.2-55a676,676,0,0,0-54.86-86.57l-71.6,71.6a577.43,577.43,0,0,1,51.93,89.51q4.48,9.62,8.63,19.42,5.68,13.46,10.68,27.12a574.84,574.84,0,0,1,26.63,100h101.25A673.87,673.87,0,0,0,1611.89,760.77ZM759.76,1507.48q-13.66-5-27.13-10.69-8.29-3.51-16.45-7.27a577.14,577.14,0,0,1-89.92-51.5l-71.66,71.66a677,677,0,0,0,86.91,54.51q25.47,13.39,52.17,24.7a681.91,681.91,0,0,0,66.08,24,671.36,671.36,0,0,0,100,22.44V1534.09A575.67,575.67,0,0,1,759.76,1507.48ZM1283.59,1444a579,579,0,0,1-91.32,50.09q-3.18,1.39-6.39,2.75-13.45,5.68-27.12,10.68a575.7,575.7,0,0,1-100,26.62v101.25a671.36,671.36,0,0,0,100-22.44,680.77,680.77,0,0,0,66.07-24q21.68-9.17,42.55-19.74a676.56,676.56,0,0,0,88.08-53.33Zm-851-235.09q-5.15-10.86-9.84-22-5.7-13.46-10.68-27.12a573.92,573.92,0,0,1-26.62-100H284.19a675.48,675.48,0,0,0,46.45,166.08q12.47,29.46,27.5,57.44a675.87,675.87,0,0,0,55.16,86.27L484.85,1298A575.8,575.8,0,0,1,432.58,1208.86ZM759.76,307.64a679.34,679.34,0,0,0-66.08,24q-27.95,11.82-54.56,26a674.64,674.64,0,0,0-86.62,54.8L624.1,484a577.57,577.57,0,0,1,89.57-51.85q9.39-4.38,19-8.42,13.46-5.7,27.13-10.69a575.7,575.7,0,0,1,100-26.62V285.2A673.87,673.87,0,0,0,759.76,307.64Zm-402.89,332q-14.3,26.83-26.23,55.05a675.48,675.48,0,0,0-46.45,166.08H385.44a573.92,573.92,0,0,1,26.62-100q5-13.66,10.68-27.12,4.15-9.84,8.66-19.48a577.7,577.7,0,0,1,51.93-89.49l-71.6-71.6A675.89,675.89,0,0,0,356.87,639.64Z"></path><circle class="cls-1" cx="960" cy="960" r="302"></circle></g></svg></div><div class="menu-item__text">More</div></button>'
  
  sidebar.appendChild(more)

  more.querySelector("button").addEventListener('click', (e) => {
    if(!moreDrawerExpansion) {
      createMoreExpansion(more);
    } else {
      moreDrawerExpansion.remove();
      moreDrawerExpansion = undefined;
      moreDrawerExpansionOverlay.remove();
      moreDrawerExpansionOverlay = undefined;
    }
  })
})

let moreDrawerExpansion = undefined;
let moreDrawerExpansionOverlay = undefined;

const createMoreExpansion = (more) => {

  const top = window.innerHeight / 2 > pointerY;

  moreDrawerExpansionOverlay = document.createElement('div')
  moreDrawerExpansionOverlay.id = 'sidebar-custom-menu-icon-more-expansion-overlay'
  moreDrawerExpansionOverlay.classList.add('more-expansion-overlay')
  moreDrawerExpansionOverlay.addEventListener('click', (e) => {
      moreDrawerExpansion.remove();
      moreDrawerExpansion = undefined;
      moreDrawerExpansionOverlay.remove();
      moreDrawerExpansionOverlay = undefined;
  })

  moreDrawerExpansion = document.createElement('div')
  moreDrawerExpansion.id = 'sidebar-custom-menu-icon-more-expansion'
  moreDrawerExpansion.classList.add(`more-expansion-${ top ? 'top' : 'bottom' }`)
  moreDrawerExpansion.style = '--y-position: ' + (top ? Math.max(pointerY - 85, 20) : Math.max(window.innerHeight - pointerY - 85 , 20)) + 'px;';

  document.querySelectorAll("#menu > li:not(.cpx-outside-settings-drawer)").forEach((ele) => {
    const clone = ele.cloneNode(true);
    clone.addEventListener('click', (e) => {
      e.preventDefault()
      ele.querySelector('button, a').click()

      moreDrawerExpansion.remove();
      moreDrawerExpansion = undefined;
      moreDrawerExpansionOverlay.remove();
      moreDrawerExpansionOverlay = undefined;
    })
    moreDrawerExpansion.appendChild(clone)
  })

  more.appendChild(moreDrawerExpansionOverlay)
  more.appendChild(moreDrawerExpansion)
}

const notHidden = ["Dashboard", "Courses", "Calendar", "Inbox", "Settings", "Search"]
const hidden = []

delayedQuerySelector("#menu").then(element => {
  document.querySelectorAll("#menu > li .menu-item__text").forEach(buttonText => {
    if(notHidden.includes(buttonText.textContent.trim())) {
      buttonText.parentElement.parentElement.classList.add("cpx-outside-settings-drawer")
    } else {
      hidden.push(buttonText.parentElement)
    }
  })
})
/* <li class="menu-item ic-app-header__menu-list-item">
<button id="global_nav_history_link" class="ic-app-header__menu-list-link">
  <div class="menu-item-icon-container" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920" class="ic-icon-svg menu-item__icon svg-icon-history" style="
width: calc(var(--sidebar-icon-width) * 1.2) !important;
"><defs><style>.cls-1{fill:none;stroke:var(--ic-brand-global-nav-ic-icon-svg-fill);stroke-miterlimit:10;stroke-width:100px;}</style></defs><g id="Layer_1" data-name="Layer 1"><path d="M1016,0H904C824.88,0,760.5,64.38,760.5,143.52V307.37a673.87,673.87,0,0,1,100-22.44V143.52A43.57,43.57,0,0,1,904,100h112a43.57,43.57,0,0,1,43.52,43.52V284.93a673.87,673.87,0,0,1,100,22.44V143.52C1159.5,64.38,1095.12,0,1016,0Z"></path><path d="M1059.5,1635.07v141.41A43.57,43.57,0,0,1,1016,1820H904a43.57,43.57,0,0,1-43.52-43.52V1635.07a673.87,673.87,0,0,1-100-22.44v163.85C760.5,1855.62,824.88,1920,904,1920h112c79.14,0,143.52-64.38,143.52-143.52V1612.63A673.87,673.87,0,0,1,1059.5,1635.07Z"></path><path d="M143.52,1059.5A43.57,43.57,0,0,1,100,1016V904a43.57,43.57,0,0,1,43.52-43.52H284.93a673.87,673.87,0,0,1,22.44-100H143.52C64.38,760.5,0,824.88,0,904v112c0,79.14,64.38,143.52,143.52,143.52H307.37a673.87,673.87,0,0,1-22.44-100Z"></path><path d="M1776.48,760.5H1612.63a673.87,673.87,0,0,1,22.44,100h141.41A43.57,43.57,0,0,1,1820,904v112a43.57,43.57,0,0,1-43.52,43.52H1635.07a673.87,673.87,0,0,1-22.44,100h163.85c79.14,0,143.52-64.38,143.52-143.52V904C1920,824.88,1855.62,760.5,1776.48,760.5Z"></path><path d="M1656.43,342.44l-79.17-79.17c-56-56-147-56-203,0l-94.1,94.1a677.9,677.9,0,0,1,86.61,54.81L1445,334a43.57,43.57,0,0,1,61.55,0l79.17,79.17a43.57,43.57,0,0,1,0,61.55l-78.16,78.16a674.33,674.33,0,0,1,54.85,86.56l94-94C1712.39,489.45,1712.39,398.4,1656.43,342.44Z"></path><path d="M555.35,1509.41,460.76,1604a43.57,43.57,0,0,1-61.55,0L320,1524.83a43.56,43.56,0,0,1,0-61.54l94-94A676.9,676.9,0,0,1,358.89,1283L249.33,1392.58c-56,56-56,147,0,203l79.17,79.17c56,56,147,56,203,0l110.79-110.79A677,677,0,0,1,555.35,1509.41Z"></path><path d="M563.47,281c-56-56-147-56-203,0l-79.17,79.17c-56,55.95-56,147,0,203l76.28,76.28a676.59,676.59,0,0,1,54.86-86.56L352,492.38a43.56,43.56,0,0,1,0-61.54l79.17-79.17a43.57,43.57,0,0,1,61.55,0l60.48,60.48a676.84,676.84,0,0,1,86.62-54.8Z"></path><path d="M1656.08,1392.58,1556,1292.44a675.81,675.81,0,0,1-56.31,85.12l85.73,85.73a43.56,43.56,0,0,1,0,61.54L1506.2,1604a43.56,43.56,0,0,1-61.54,0l-88.46-88.46a675.52,675.52,0,0,1-88.08,53.34L1374,1674.71c56,56,147,56,203,0l79.17-79.17C1712,1539.58,1712,1448.53,1656.08,1392.58Z"></path></g><g id="Layer_2" data-name="Layer 2"><path d="M1279.44,357.65q-26.62-14.16-54.61-26a675.7,675.7,0,0,0-166.07-46.46V386.45a574.84,574.84,0,0,1,100,26.63q13.66,5,27.12,10.68,9.6,4.07,19,8.44a577.49,577.49,0,0,1,89.55,51.87l71.61-71.61A675.7,675.7,0,0,0,1279.44,357.65Zm253.64,702.12a574.84,574.84,0,0,1-26.63,100q-5,13.67-10.68,27.12-6.84,16.17-14.58,31.81a578.24,578.24,0,0,1-53.67,87.75l71.38,71.38a679.17,679.17,0,0,0,135.43-318.06Zm78.81-299a682.7,682.7,0,0,0-24-66.08q-11.92-28.19-26.2-55a676,676,0,0,0-54.86-86.57l-71.6,71.6a577.43,577.43,0,0,1,51.93,89.51q4.48,9.62,8.63,19.42,5.68,13.46,10.68,27.12a574.84,574.84,0,0,1,26.63,100h101.25A673.87,673.87,0,0,0,1611.89,760.77ZM759.76,1507.48q-13.66-5-27.13-10.69-8.29-3.51-16.45-7.27a577.14,577.14,0,0,1-89.92-51.5l-71.66,71.66a677,677,0,0,0,86.91,54.51q25.47,13.39,52.17,24.7a681.91,681.91,0,0,0,66.08,24,671.36,671.36,0,0,0,100,22.44V1534.09A575.67,575.67,0,0,1,759.76,1507.48ZM1283.59,1444a579,579,0,0,1-91.32,50.09q-3.18,1.39-6.39,2.75-13.45,5.68-27.12,10.68a575.7,575.7,0,0,1-100,26.62v101.25a671.36,671.36,0,0,0,100-22.44,680.77,680.77,0,0,0,66.07-24q21.68-9.17,42.55-19.74a676.56,676.56,0,0,0,88.08-53.33Zm-851-235.09q-5.15-10.86-9.84-22-5.7-13.46-10.68-27.12a573.92,573.92,0,0,1-26.62-100H284.19a675.48,675.48,0,0,0,46.45,166.08q12.47,29.46,27.5,57.44a675.87,675.87,0,0,0,55.16,86.27L484.85,1298A575.8,575.8,0,0,1,432.58,1208.86ZM759.76,307.64a679.34,679.34,0,0,0-66.08,24q-27.95,11.82-54.56,26a674.64,674.64,0,0,0-86.62,54.8L624.1,484a577.57,577.57,0,0,1,89.57-51.85q9.39-4.38,19-8.42,13.46-5.7,27.13-10.69a575.7,575.7,0,0,1,100-26.62V285.2A673.87,673.87,0,0,0,759.76,307.64Zm-402.89,332q-14.3,26.83-26.23,55.05a675.48,675.48,0,0,0-46.45,166.08H385.44a573.92,573.92,0,0,1,26.62-100q5-13.66,10.68-27.12,4.15-9.84,8.66-19.48a577.7,577.7,0,0,1,51.93-89.49l-71.6-71.6A675.89,675.89,0,0,0,356.87,639.64Z"></path><circle class="cls-1" cx="960" cy="960" r="302"></circle></g></svg>
  </div>
  <div class="menu-item__text">
    History
  </div>
</button>
</li>" */