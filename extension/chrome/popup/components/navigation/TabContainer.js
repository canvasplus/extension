import React from 'react';
import Tab from './Tab';

const Tabs = (props) => {
  const tabs = props.tabs;
  const items = tabs.map((tab) => {
    return <Tab name={tab.name} />
  })
  return (
    <div className="Navigation__TabContainer">
      { items }
    </div>
  );
}

export default Tabs;
