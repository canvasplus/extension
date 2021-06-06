import React from 'react';

const Tab = (props) => {
  const id = props.id;
  
  const clickHander = () => {
    props.onTabChange(id)
  }

  return (
    <div className="Navigation__Tab" onClick={clickHander}>
      {props.name}
    </div>
  );
}

export default Tab;
