// Modified from https://codesandbox.io/s/dazzling-galileo-01g0g?file=/src/App.js
import React, {useState} from "react";
import "./Slider.css";
const Slider = ({ state, setState, min, max, defaultval}) => {

  const range = React.createRef();
  const [value, rangevalue] = useState(state);
  document.documentElement.style.setProperty("--slider-border-color", (value == defaultval ? "gray" : ""));
  const rangeinput = () => {
    setState(parseInt(range.current.value));
    rangevalue(parseInt(range.current.value));
  }

  return (
    <div className="Slider">
      <input className="range" type="range" ref={range} max={max} min={min} defaultValue={state} onInput={rangeinput}/>
      <div className="Slider-Bubble">{ value }</div>
    </div>
  );
}

export default Slider;