import React, {useState} from 'react';
import LargeOption from '../interactive/LargeOption.js';

import LargeOptionForm from '../interactive/LargeOptionForm.js'

const AppearanceSelector = (props) => {
  const selectHandler = (id) => {
    setSelected(id);
  }

  const [selected, setSelected] = useState("light")

  const options = props.appearances.map(apr => {
    return <LargeOption id={apr.appearance} selected={selected} onSelected={selectHandler} backgroundColor={apr.background} color={apr.foreground}>{ apr.name }</LargeOption>
  })
  return (
    <LargeOptionForm>
      { options }
    </LargeOptionForm>
  );
}

export default AppearanceSelector;
