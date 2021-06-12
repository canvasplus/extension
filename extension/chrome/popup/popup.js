import React, {useState} from 'react';

import './Popup.css'

import Panel from './components/structure/Panel';
import Navigation from './components/navigation/Navigation';
import FrameContainer from './components/frames/FrameContainer';
import Setting from './components/settings/Setting';
import SettingGroup from './components/settings/SettingGroup';

const popup = () => {
  const [currentTab, setCurrentTab] = useState("changes")

const tabChangeHandler = (newTabId) => {
  console.log('(highest) switching to tab ' + newTabId)
  setCurrentTab(newTabId)
}

const frames = {
  "changes": {
    "element": (
      <h1>hello world</h1>
    )
  }, "settings": {
    "element": (
      <span>
        <h1>Settings</h1>
        <Setting name="Smart Scrolling" description="Adds scroll to bottom and back to top buttons." />
        <SettingGroup name="Miscellaneous">
          <Setting name="Speed Boost" description="Improve loading speeds by preloading links." />
          <Setting name="Speed Boost" description="Improve loading speeds by preloading links." />
        </SettingGroup>
      </span>
    )
  }
}

  return (
    <div><Panel size='1'>
    <Navigation onTabChange={tabChangeHandler} currentTab={currentTab}/>
    <FrameContainer currentTab={currentTab} frames={frames}/>
  </Panel></div>
    
  );
}

export default popup;
