import React, {useState, useEffect} from 'react';

import './Popup.css'

import Panel from './components/structure/Panel';
import Navigation from './components/navigation/Navigation';
import FrameContainer from './components/frames/FrameContainer';
import CustomizableSetting from './components/settings/CustomizableSetting';
import Setting from './components/settings/Setting';
import SettingGroup from './components/settings/SettingGroup';
import AppearanceSelector from './components/display/AppearanceSelector';
import ColorSwitch from './components/interactive/ColorSwitch';
import LimitedColorSwitch from './components/interactive/LimitedColorSwitch';
import ActiveSidebarColorSwitch from './components/interactive/ActiveSidebarColorSwitch';
import SidebarBackgroundColorPicker from './components/interactive/color/SidebarBackgroundColorPicker';
import Slider from './components/interactive/Slider';
import SidebarDrawerExpansionCustomization from './components/interactive/SidebarDrawerExpansionCustomization';

const popup = () => {

  const [currentTab, setCurrentTab] = useState("settings")
  const tabChangeHandler = (newTabId) => {
  setCurrentTab(newTabId)
}

const frames = {
  "settings": {
    "name": "Settings",
    "element": (
      <span>
        <SettingGroup name="Navigation">
          <Setting name="Search" setting="search" description="Search through your courses anywhere on Canvas." />
          <Setting name="Smart Scrolling" setting="smartscroll" description="Adds scroll to bottom and back to top buttons." />
          <Setting name="Speed Boost" setting="quicklink" description="Improve loading speeds by preloading links. May cause 403 Forbidden errors." />
        </SettingGroup>
        <SettingGroup name="Other">
          <Setting name="Rounder Modules" setting="roundermodules" description="Give the modules page a rounder appearance." />
          <Setting name="Quick Inbox" setting="convopeeker" description="View your emails without opening a new page, just click the inbox button." />
          <Setting name="Allow Surveys" setting="$canvasplus-allow-surveys" description="From time to time, the Canvas+ team releases surveys to help improve your learning." />
        </SettingGroup>
      </span>
    )
  }, "display": {
    "name": "Display",
    "element": (
      <span>
        <div className="center">
          <div className="margin">
            <b>Appearance</b>
            <p className="color-gray small-margin">Change the color scheme of Canvas.</p>
            <p className="color-gray small-margin">Note: Dark and dim mode may have issues. You can report bugs <a href="https://github.com/canvasplus/extension/issues" target="_blank">here</a>.</p>
          </div>
          <AppearanceSelector appearances={[
            {
              name: "Default",
              appearance: "light",
              background: "#eee",
              foreground: "#444"
            },
            {
              name: "Dim",
              appearance: "dim",
              background: "#45484e",
              foreground: "#fff"
            },
            {
              name: "Lights Out",
              appearance: "dark",
              background: "#050d26",
              foreground: "#fff"
            }
          ]}></AppearanceSelector>
        </div>
        <SettingGroup name="Sidebar">
          <CustomizableSetting name="Expansion Drawer" setting="sidebar-drawer" description={"Adds a \"More\" button to the sidebar to hide unused buttons."} customizationContent={(enabled) => { return <SidebarDrawerExpansionCustomization featureEnabled={enabled}/>} } /> 
          <Setting name="Background Color" setting="sidebar-color" description="Change the background color of the sidebar." defaultValue="#1b7ecf" customInput={(state, setState) => { return <SidebarBackgroundColorPicker state={state} setState={setState} />}}/>
          <Setting name="Active Background Color" setting="active-sidebar-color" description="Change the background color of the active sidebar button."  defaultValue={{'background': 'darker', 'icon': 'white'}} customInput={(state, setState) => { return <ActiveSidebarColorSwitch state={state} setState={setState}/> }} />
          <Setting name="Icon Color" setting="sidebar-icon-color" description="Change the icon color of the sidebar." defaultValue="white" customInput={(state, setState) => { return <LimitedColorSwitch state={state} setState={setState} generateTooltip={(color) => {if(color === "unset") {return <><b>Default Icons</b><p>Sidebar icons will inherit the default colors of your school.</p></>;} else if(["black","white"].includes(color)) {return <><b>{ color.charAt(0).toUpperCase() + color.slice(1) } Icons</b><p>Sidebar icons will always appear in { color }.</p></>} else {return <><b>Custom Icons</b><p>Click to open a color wheel and chose a custom icon color.</p></>;}}}/> }} />
          <Setting name="Icon Size" setting="sidebar-icon-size" description="Increase or decrease the size of sidebar icons." defaultValue={3} customInput={(state, setState) => { return <Slider state={state} setState={setState} min={1} max={7} bubbleRenderer={(bubble) => { if(bubble === 5) return 'Normal'; else if (bubble > 5) return 'Large'; else if(bubble < 5) return "Small"; }} />}} />
          <Setting name="More Spacing" setting="sidebar-more-spacing" description="Increase the spacing between sidebar icons." />
          <Setting name="Setting Button" setting="sidebar-show-settings" description="Quick access to settings with a button on the sidebar." />
        </SettingGroup>
        <SettingGroup name="Other">
          <Setting name="Link Color" setting="linkcolor" description="Change the color of links on Canvas." defaultValue="" customInput={(state, setState) => { return <ColorSwitch state={state} setState={setState} /> }} />
          <Setting name="Hide Logo" setting="hidelogo" description="Hide the logo on the top of the sidebar and todo." />
        </SettingGroup>
      </span>
    )
  }
}

useEffect(() => {
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search)
  
    if(urlParams.get("tab") === "display") {
      setCurrentTab("display")
    }

    if(urlParams.get("click-x-id")) {
      document.querySelector("#" + urlParams.get("click-x-id"))?.click()
    }
  })
}, [])

  return (
    <div><Panel size='1'>
    <Navigation onTabChange={tabChangeHandler} currentTab={currentTab} sections={frames}/>
    <FrameContainer currentTab={currentTab} frames={frames}/>
  </Panel></div>

  );
}

export default popup;
