import React from 'react';

import './Tab.css'

const Tab = (props) => {
  const id = props.id;

  const className = id === props.currentTab ? "Navigation__Tab active" : "Navigation__Tab"
  
  const clickHander = () => {
    props.onTabChange(id)
  }

  return (
    <div className={className} onClick={clickHander} style={{ width: (240 / props.siblings) + "px"}}>
      <p className="Tab__Label">{props.name}</p>
    </div>
  );
}

export default Tab;
