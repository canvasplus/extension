import React from 'react';
import ToggleSwitch from '../interactive/ToggleSwitch';

import './Setting.css'

const Setting = (props) => {
  return (
    <div className="Setting">
      <div className="Setting__info">
        <b className="Setting__name">{props.name}</b>
        <p className="Setting__description">{props.description}</p>
      </div>
      <ToggleSwitch switched={true} onSwitched={(state) => {
        console.log(state)
      }}/>
    </div>
  );
}

export default Setting;
