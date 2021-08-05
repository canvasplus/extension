import React, {useState} from 'react';

import './Popup.css'

import Panel from './components/structure/Panel';
import Navigation from './components/navigation/Navigation';
import FrameContainer from './components/frames/FrameContainer';
import Setting from './components/settings/Setting';
import SettingGroup from './components/settings/SettingGroup';
import AppearanceSelector from './components/display/AppearanceSelector';
import Hover from './components/interactive/Hover'

const popup = () => {
  const [currentTab, setCurrentTab] = useState("changes")

const tabChangeHandler = (newTabId) => {
  console.log('(highest) switching to tab ' + newTabId)
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
          <p className="changes-items">New Popup</p>
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
          <Setting name="Navigator" setting="navigator" description="Go to any page or list using a popout menu." />
        </SettingGroup>
        <SettingGroup name="Email">
          <Setting name="Email Peeker" setting="convopeeker" description="View your emails without opening a new page, just click the inbox button." />
        </SettingGroup>
        <SettingGroup name="Other">
          <Setting name="Smart Scrolling" setting="smartscroll" description="Adds scroll to bottom and back to top buttons." />
          <Setting name="Speed Boost" setting="quicklink" description="Improve loading speeds by preloading links." />
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
          <Setting name="Sidebar Color" setting="sidebar-color" description="Change the background color of the sidebar." />
          <Setting name="Sidebar Size" setting="sidebar-size-toggle" description="Change the size of the text and images on the sidebar." />
        </SettingGroup>
        <SettingGroup name="Other">
          <Setting name="Link Color" setting="linkcolor-toggle" description="Change the color of links on Canvas." />
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
