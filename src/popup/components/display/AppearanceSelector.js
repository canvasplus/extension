import React, {useState, useEffect} from 'react';
import LargeOption from '../interactive/LargeOption.js';

import LargeOptionForm from '../interactive/LargeOptionForm.js'

import styles from './AppearanceSelector.module.css'

const AppearanceSelector = (props) => {
  const selectHandler = (id) => {
    if(id === "light") {
      syncCheckbox.current.checked = false;
      syncCheckbox.current.disabled = true;
    } else {
      syncCheckbox.current.disabled = false;
    }

    setSelected(id);
    const newAppearance = id + (syncCheckbox.current.checked ? '_auto' : '')
    chrome.storage.local.set({'canvasplus-display-appearance': newAppearance})
  }

  const [selected, setSelected] = useState("")

  const syncCheckbox = React.createRef()

  const options = props.appearances.map(apr => {
    return <LargeOption id={apr.appearance} selected={selected} onSelected={selectHandler} backgroundColor={apr.background} color={apr.foreground}>{ apr.name }</LargeOption>
  })

  useEffect(() => {
    chrome.storage.local.get(['canvasplus-display-appearance'], function(data) {
      if(data['canvasplus-display-appearance'] !== undefined) {
        let appearance = data['canvasplus-display-appearance']
        
        if(appearance.endsWith("auto")) {
          appearance = appearance.substring(0, appearance.length - 5)
          syncCheckbox.current.checked = true
        }

        setSelected(appearance)
      } else {
        console.log('Setting canvasplus-display-appearance was unset')

        const toChange = {}
        toChange['canvasplus-display-appearance'] = 'light'

        chrome.storage.local.set(toChange)

        setSelected('light')
      }
    });
  }, [])
  
  return (<>
    <LargeOptionForm>
      { options }
    </LargeOptionForm>
    <label className={selected === "light" ? styles.AppearanceSelector__SyncLabel_Disabled : styles.AppearanceSelector__SyncLabel }>
      Sync with OS
      <input ref={syncCheckbox} type="checkbox" onChange={() => {
        selectHandler(selected)
      }}></input>
    </label>
  </>);
}

export default AppearanceSelector;
