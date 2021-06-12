import React, {useState} from 'react';

import './SettingGroup.css';

const SettingGroup = (props) => {
  const [open, setOpen] = useState(true)

  const labelClickHandler = () => {
    setOpen(!open)
  }

  const className = open ? "SettingGroup" : "SettingGroup closed"

  return (
    <div className={className}>
      <b className="SettingGroup__Name" onClick={ labelClickHandler }>{ props.name }</b>
      <div className="SettingGroup__SettingsContainer">
        { props.children }
      </div>
    </div>
  );
}

export default SettingGroup;
