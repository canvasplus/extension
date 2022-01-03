import React, {useState, useEffect} from 'react';
import LargeOption from '../interactive/LargeOption.js';

import LargeOptionForm from '../interactive/LargeOptionForm.js'

import styles from './AppearanceSelector.module.css'

const AppearanceSelector = (props) => {
  const selectHandler = (id=selected, isAuto=auto) => {
    if(id === "light") {
      isAuto = false
      syncCheckbox.current.checked = false
      syncCheckbox.current.disabled = true
    } else {
      syncCheckbox.current.disabled = false
    }

    setSelected(id)
    setAuto(isAuto)

    chrome.storage.local.set({'canvasplus-display-appearance': `${id}${isAuto ? "_auto" : ""}`})
  }

  const [selected, setSelected] = useState("")
  const [auto, setAuto] = useState(false)

  const syncCheckbox = React.createRef()

  const options = props.appearances.map(apr => {
    return <LargeOption id={apr.appearance} selected={selected} onSelected={selectHandler} backgroundColor={apr.background} color={apr.foreground}>{ apr.name }</LargeOption>
  })

  useEffect(() => {
    chrome.storage.local.get(['canvasplus-display-appearance'], function(data) {
      const originalAppearance = data['canvasplus-display-appearance']
      const isAuto = originalAppearance.endsWith("_auto")

      setSelected(isAuto ? originalAppearance.substring(0, originalAppearance.length - 5) : originalAppearance)
      setAuto(isAuto)
    })
  }, [])
  
  return (<>
    <LargeOptionForm>
      { options }
    </LargeOptionForm>

    <label className={selected === "light" || selected === "" ? styles.AppearanceSelector__SyncLabel_Disabled : styles.AppearanceSelector__SyncLabel }>
      <input ref={syncCheckbox} type="checkbox" checked={auto} onChange={(e) => {
        selectHandler(undefined, e.target.checked)
      }}></input>
      <p>Sync with OS</p>
    </label>

  </>);
}

export default AppearanceSelector;
