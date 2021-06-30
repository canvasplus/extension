import React, {useState, useEffect} from 'react';
import ToggleSwitch from '../interactive/ToggleSwitch';

import './Setting.css'

const Setting = (props) => {
  const [input, setInput] = useState(<div></div>);

  useEffect(() => {
    const setting = 'canvasplus-setting-' + props.setting;

    chrome.storage.local.get([setting], function(data) {
      if(data[setting] !== undefined) {
        setInput(<ToggleSwitch switched={data[setting]} onSwitched={(state) => {
          const toChange = {}
          toChange[setting] = state

          chrome.storage.local.set(toChange)  
        }}/>)
      } else {
        console.log('Setting ' + setting + ' was unset')

        const toChange = {}
        toChange[setting] = true

        chrome.storage.local.set(toChange)
      }
    });
  }, [])

  return (
    <div className="Setting">
      <div className="Setting__info">
        <b className="Setting__name">{props.name}</b>
        <p className="Setting__description">{props.description}</p>
      </div>
      {input}
    </div>
  );
}

export default Setting;
