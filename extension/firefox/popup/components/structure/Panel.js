import React from 'react';

import './Panel.css';

const Panel = (props) => {
  return (
    <div className={'Panel-size-' + props.size}>
      {props.children}
    </div>
  );
}

export default Panel;
