import React from 'react';

import './Frame.css';

const Frame = (props) => {
  const className = props.yourId === props.currentTab ? "Frame active" : "Frame"

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export default Frame;
