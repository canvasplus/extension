import React from 'react';
import { render } from 'react-dom';

import './Popup.css'

import Panel from './components/structure/Panel';
import Navigation from './components/navigation/Navigation';

render((<Panel size='1'>
  <Navigation />
</Panel>), document.querySelector('#popup'));