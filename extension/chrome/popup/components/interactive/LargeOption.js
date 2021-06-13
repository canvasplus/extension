import React from 'react';

import './LargeOption.css';

const LargeOption = (props) => {
  const backgroundColor = props.backgroundColor != null ? props.backgroundColor : "#000"
  const color = props.color != null ? props.color : "#fff"
  return (
    <div className="LargeOptionForm__Option" style={{backgroundColor: backgroundColor}}>
      <p style={{color: color}}>{ props.children }</p>
    </div>
  );
}

export default LargeOption;
