import React, { useState } from 'react';

import './ToggleSwitch.css'

const ToggleSwitch = (props) => {

  const [switched, setSwitched] = useState(props.switched)

  const clickHandler = () => {
    const newState = !switched;
    props.onSwitched(newState);
    setSwitched(newState);
  }

  return (
    <button className={switched ? "SettingInput ToggleSwitch on" : "SettingInput ToggleSwitch"} onClick={clickHandler}>
      <div className="ToggleSwitch__Handle"></div>
    </button>
  );
}

export default ToggleSwitch;
