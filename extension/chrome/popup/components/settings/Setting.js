import React from 'react';

import './Setting.css'
const Setting = (props) => {
  return (
    <div className="Setting">
      <b className="Setting__name">{props.name}</b>
      <p className="Setting__description">{props.description}</p>
    </div>
  );
}

export default Setting;
