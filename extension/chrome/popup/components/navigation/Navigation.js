import React from 'react';
import Banner from './Banner';
import Tab from './Tab';
import TabContainer from './TabContainer';

function Navigation(props) {
  const tabs = []
  Object.keys(props.sections).forEach(item => {
    tabs.push({
      "name": props.sections[item].name,
      "id": item
    })
  })
  return (
    <div>
      <Banner />
      <TabContainer onTabChange={props.onTabChange} currentTab={props.currentTab} tabs={
        tabs
      }/>
    </div>
  )
}

export default Navigation;