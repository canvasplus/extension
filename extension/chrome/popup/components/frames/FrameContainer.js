import React from 'react';

import Frame from './Frame.js';

const FrameContainer = (props) => {
  const frames = props.frames

    const items = Object.keys(frames).map(item => {
      return <Frame yourId={item} currentTab={props.currentTab}>
        {frames[item].element}
      </Frame>
    })

    return (<div>{items}</div>
    );
}

export default FrameContainer;
