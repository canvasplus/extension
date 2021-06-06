import React from 'react';
import Banner from './Banner';
import Tab from './Tab';
import TabContainer from './TabContainer';

function Navigation() {
  return (
    <div>
      <Banner />
      <TabContainer tabs={
        [
          {
            "name": "Changes"
          },
          {
            "name": "Settings"
          },
          {
            "name": "Display"
          }
        ]
      }/>
    </div>
  )
}

export default Navigation;