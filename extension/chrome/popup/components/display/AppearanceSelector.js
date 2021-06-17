import React, {useState, useEffect} from 'react';
import LargeOption from '../interactive/LargeOption.js';

import LargeOptionForm from '../interactive/LargeOptionForm.js'

const AppearanceSelector = (props) => {
  const selectHandler = (id) => {
    setSelected(id);
    chrome.storage.local.set({'canvasplus-display-appearance': id})
  }
  const [selected, setSelected] = useState("")

  const options = props.appearances.map(apr => {
    return <LargeOption id={apr.appearance} selected={selected} onSelected={selectHandler} backgroundColor={apr.background} color={apr.foreground}>{ apr.name }</LargeOption>
  })

  useEffect(() => {
    chrome.storage.local.get(['canvasplus-display-appearance'], function(data) {
      if(data['canvasplus-display-appearance'] !== undefined) {
        setSelected(data['canvasplus-display-appearance'])
      } else {
        console.log('Setting canvasplus-display-appearance was unset')

        const toChange = {}
        toChange['canvasplus-display-appearance'] = 'light'

        chrome.storage.local.set(toChange)

        setSelected('light')
      }
    });
  }, [])
  
  return (
    <LargeOptionForm>
      { options }
    </LargeOptionForm>
  );
}

export default AppearanceSelector;
