
import React, {useState, useEffect} from 'react';
import ToggleSwitch from '../interactive/ToggleSwitch';

import './CustomizableSetting.css'

const CustomizableSetting = ({ setting, name, description, customizationContent }) => {

  const [input, setInput] = useState(<div></div>)

  const [toggleState, setToggleState] = useState(false)

  const [customizationShowing, setCustomizationShowing] = useState(false)
  
  useEffect(() => {
    const fullSettingName = 'canvasplus-setting-' + setting;
    
    chrome.storage.local.get([fullSettingName], (data) => {

      if(data[fullSettingName] === undefined) {
        data[fullSettingName] = defaultValue;
        const toChange = {}
        toChange[fullSettingName] = defaultValue;
        chrome.storage.local.set(toChange)
      }

      setToggleState(data[fullSettingName])
      
      setInput(<ToggleSwitch switched={ data[fullSettingName] } onSwitched={ (state) => {
        setToggleState(state)
        const toChange = {}
        toChange[fullSettingName] = state;
        chrome.storage.local.set(toChange);
      }} /> )

    })
  }, [])

  const customization = <div className="CustomizableSetting__Customization">
    <div className="CustomizableSetting__Customization__Overlay" onClick={ () => { setCustomizationShowing(false) } }/>
    <div className="CustomizableSetting__Customization__Content">{ customizationContent(toggleState) }</div>
  </div>

  return (
    <div className="CustomizableSetting">
      <div className="CustomizableSetting__info">
        <b className="CustomizableSetting__name">{name}</b>
        <p className="CustomizableSetting__description">{description}</p>
        <button id={`CustomizableSetting__CustomizeButton__` + setting} className={`CustomizableSetting__customize_${toggleState ? "enabled" : "disabled"}`} onClick={() => {
          setCustomizationShowing(true)
        }}>Customize</button>
      </div>
      { input }
      { customizationShowing ? customization : <></> }
    </div>
  );
}

export default CustomizableSetting;
