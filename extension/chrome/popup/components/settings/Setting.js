
import React, {useState, useEffect} from 'react';
import ToggleSwitch from '../interactive/ToggleSwitch';

import './Setting.css'

const Setting = (props) => {
  let { setting, name, description, defaultValue, customInput} = props;

  const [input, setInput] = useState(<div></div>);

  if(defaultValue === undefined) defaultValue = true
  if(!customInput) {
    customInput = function(state, setState) {
      return <ToggleSwitch switched={state} onSwitched={(setState)}/>
    }
  }

  useEffect(() => {
    const fullSettingName = 'canvasplus-setting-' + setting;
    chrome.storage.local.get([fullSettingName], (data) => {
      if(data[fullSettingName] === undefined) {
        data[fullSettingName] = defaultValue;
        const toChange = {}
        toChange[fullSettingName] = defaultValue;
        chrome.storage.local.set(toChange)
      }
      
      setInput(customInput(data[fullSettingName], (state) => {
        const toChange = {}
        toChange[fullSettingName] = state;
        chrome.storage.local.set(toChange)
      }))
    })
  }, [])

  return (
    <div className="Setting">
      <div className="Setting__info">
        <b className="Setting__name">{name}</b>
        <p className="Setting__description">{description}</p>
      </div>
      {input}
    </div>
  );
}

export default Setting;
