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
    sidebarColor.setRule('--sidebar-background-color: ' + (value.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/) ? value : 'var(--ic-brand-global-nav-bgd)'))
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
}])