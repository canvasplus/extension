import React from 'react';
import Tab from './Tab';

const Tabs = (props) => {
  const tabs = props.tabs;
  const items = tabs.map((tab) => {
    return <Tab id={tab.id} name={tab.name} onTabChange={props.onTabChange} siblings={tabs.length} currentTab={props.currentTab}/>
  })
  return (
    <div className="Navigation__TabContainer">
      { items }
    </div>
  );
}

export default Tabs;
