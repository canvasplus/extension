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
    "name": "Changes",
    "element": (
      <h1>hello world</h1>
    )
  }, "settings": {
    "name": "Settings",
    "element": (
      <span>
        <h1>Settings</h1>
        <SettingGroup name="Navigation">
          <Setting name="Search" setting="search" description="Search through your courses anywhere on Canvas." />
          <Setting name="Navigator" setting="navigator" description="Go to any page or list using a popout menu." />
          <Setting name="Bookmark Button" setting="bookmark_button" description="Add a page to your bookmarks with a button." />
        </SettingGroup>
        <SettingGroup name="Conversations">
          <Setting name="Conversation Peeker" setting="convopeeker" description="View your emails without opening a new page, just click the inbox button." />
          <Setting name="Markdown Editor" setting="convomd" description="Use bold, italics, and more in your emails." />
        </SettingGroup>
        <SettingGroup name="Other">
          <Setting name="Smart Scrolling" setting="smartscroll" description="Adds scroll to bottom and back to top buttons." />
          <Setting name="Speed Boost" setting="quicklink" description="Improve loading speeds by preloading links." />
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
