import React, {useState} from 'react';

import './Popup.css'

import Panel from './components/structure/Panel';
import Navigation from './components/navigation/Navigation';
import FrameContainer from './components/frames/FrameContainer';
import Setting from './components/settings/Setting';
import SettingGroup from './components/settings/SettingGroup';
import AppearanceSelector from './components/display/AppearanceSelector';
import Hover from './components/interactive/Hover'
import ColorSwitch from './components/interactive/ColorSwitch';
import LimitedColorSwitch from './components/interactive/LimitedColorSwitch';
import ActiveSidebarColorSwitch from './components/interactive/ActiveSidebarColorSwitch';
import Slider from './components/interactive/Slider';
import CustomColorPicker from './components/interactive/CustomColorPicker';

const popup = () => {
  const [currentTab, setCurrentTab] = useState("changes")
const tabChangeHandler = (newTabId) => {
  setCurrentTab(newTabId)
}

const frames = {
  "changes": {
    "name": "Changes",
    "element": (
      <div className="canvasplus-changes">
        <Hover />
        <div className="cpc-header">
          <img src="../assets/icons/canvas-wide-white.png" alt="" width="140px" height="47px"/>
          <h2>Release 0.3</h2>
        </div>
        <div className="changes-list">
          <p className="changes-items">Customizable Sidebar</p>
          <p className="changes-items">Email Peeker</p>
          <p className="changes-items">Custom Link Colors</p>
          <p className="changes-items">Rounder Modules</p>
          <p className="changes-items">New Popup</p>
          <p className="changes-items">Dim Mode</p>
          <p className="changes-items">Bug Fixes</p>
        </div>
      </div>
    )
  }, "settings": {
    "name": "Settings",
    "element": (
      <span>
        <SettingGroup name="Navigation">
          <Setting name="Search" setting="search" description="Search through your courses anywhere on Canvas." />
          <Setting name="Smart Scrolling" setting="smartscroll" description="Adds scroll to bottom and back to top buttons." />
          <Setting name="Speed Boost" setting="quicklink" description="Improve loading speeds by preloading links." />
        </SettingGroup>
        <SettingGroup name="Other">
          <Setting name="Rounder Modules" setting="roundermodules" description="Give the modules page a rounder appearance." />
          <Setting name="Email Peeker" setting="convopeeker" description="View your emails without opening a new page, just click the inbox button." />
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
            <p className="color-gray small-margin">Note: Dark and dim mode may have issues. You can report bugs <a href="https://github.com/adrWasTaken/CanvasPlus/issues">here</a>.</p>
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
          <Setting name="Hide Logo" setting="sidebar-hidelogo" description="Hide the logo on the top of the sidebar." />
          <Setting name="Background Color" setting="sidebar-color" description="Change the background color of the sidebar." defaultValue="#1b7ecf" customInput={(state, setState) => { return <ColorSwitch state={state} setState={setState} />}}/>
          <Setting name="Active Background Color" setting="active-sidebar-color" description="Change the background color of the active sidebar button."  defaultValue={{'background': 'darker', 'icon': 'white'}} customInput={(state, setState) => { return <ActiveSidebarColorSwitch state={state} setState={setState}/> }} />
          <Setting name="Icon Color" setting="sidebar-icon-color" description="Change the icon color of the sidebar." defaultValue="white" customInput={(state, setState) => { return <LimitedColorSwitch state={state} setState={setState} generateTooltip={(color) => {if(color === "unset") {return <><b>Default Icons</b><p>Sidebar icons will inherit the default colors of your school.</p></>;} else if(["black","white"].includes(color)) {return <><b>{ color.charAt(0).toUpperCase() + color.slice(1) } Icons</b><p>Sidebar icons will always appear in { color }.</p></>} else {return <><b>Custom Icons</b><p>Click to open a color wheel and chose a custom icon color.</p></>;}}}/> }} />
          <Setting name="Smaller Icons" setting="sidebar-smaller-icons" description="Decrease the size of sidebar icons." />
          <Setting name="More Spacing" setting="sidebar-more-spacing" description="Increase the spacing between sidebar icons." />
        </SettingGroup>
        <SettingGroup name="Other">
          <Setting name="Link Color" setting="linkcolor" description="Change the color of links on Canvas." defaultValue="" customInput={(state, setState) => { return <ColorSwitch state={state} setState={setState} />}}/>
        </SettingGroup>
      </span>
    )
  }
}

  return (
    <div><Panel size='1'>
    <Navigation onTabChange={tabChangeHandler} currentTab={currentTab} sections={frames}/>
    <FrameContainer currentTab={currentTab} frames={frames}/>
  </Panel></div>

  );
}

export default popup;
