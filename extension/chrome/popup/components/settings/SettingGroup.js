import React, {useState} from 'react';

import './SettingGroup.css';

const SettingGroup = (props) => {
  const [open, setOpen] = useState(true)

  const labelClickHandler = () => {
    setOpen(!open)
  }

  const containerClassName = open ? "SettingGroup__SettingsContainer" : "SettingGroup__SettingsContainer closed"

  return (
    <div className="SettingGroup">
      <b className="SettingGroup__Name" onClick={ labelClickHandler }>{ props.name }</b>
      <div className={containerClassName}>
        { props.children }
      </div>
    </div>
  );
}

export default SettingGroup;
