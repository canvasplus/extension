import React from 'react';
import tinycolor from 'tinycolor2'

import './LargeOption.css';

const LargeOption = (props) => {
  const clickHandler = () => {
    props.onSelected(props.id)
  }
  const backgroundColor = props.backgroundColor != null ? props.backgroundColor : "#000"
  const color = props.color != null ? props.color : "#fff"
  const className = props.selected === props.id ? "LargeOptionForm__Option selected" : "LargeOptionForm__Option"
  
  var style = {"--background-color": backgroundColor, "--background-hover-color": tinycolor(backgroundColor).darken()};

  return (
    <div className={className} style={style} onClick={clickHandler}>
      <p style={{color: color}}>{ props.children }</p>
    </div>
  );
}

export default LargeOption;
