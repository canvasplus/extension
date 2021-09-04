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
    <div className={switched ? "SettingInput ToggleSwitch on" : "SettingInput ToggleSwitch"} onClick={clickHandler}>
      <div className="ToggleSwitch__Handle"></div>
    </div>
  );
}

export default ToggleSwitch;
