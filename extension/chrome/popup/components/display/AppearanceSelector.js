import React from 'react';
import LargeOption from '../interactive/LargeOption.js';

import LargeOptionForm from '../interactive/LargeOptionForm.js'

const AppearanceSelector = (props) => {
  const options = props.appearances.map(apr => {
    return <LargeOption backgroundColor={apr.background} color={apr.foreground}>{ apr.name }</LargeOption>
  })
  return (
    <LargeOptionForm>
      { options }
    </LargeOptionForm>
  );
}

export default AppearanceSelector;
