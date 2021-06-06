import React from 'react';
import Banner from './Banner';
import Tab from './Tab';
import TabContainer from './TabContainer';

function Navigation(props) {
  return (
    <div>
      <Banner />
      <TabContainer onTabChange={props.onTabChange} tabs={
        [
          {
            "name": "Changes",
            "id": "changes"
          },
          {
            "name": "Settings",
            "id": "settings"
          },
          {
            "name": "Display",
            "id": "display"
          }
        ]
      }/>
    </div>
  )
}

export default Navigation;