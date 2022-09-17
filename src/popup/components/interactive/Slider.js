// Modified from https://codesandbox.io/s/dazzling-galileo-01g0g?file=/src/App.js
import React, {useState} from "react";
import "./Slider.css";
const Slider = ({ state, setState, min, max, bubbleRenderer }) => {

  const range = React.createRef();
  const [value, rangevalue] = useState(state);
  const [bubbleRight, setBubbleRight] = useState(true);

  const rangeinput = () => {
    setState(parseInt(range.current.value));
    rangevalue(parseInt(range.current.value));
  }

  if(!bubbleRenderer) bubbleRenderer = (bubble) => {
    return bubble;
  }

  return (
    <div className="Slider">
      <input className="range" type="range" ref={range} max={max} min={min} defaultValue={state} onInput={rangeinput}/>
      <div className="Slider-Bubble" onClick={() => {
        
        if(value === max) {
          setBubbleRight(false)
          range.current.value = parseInt(range.current.value) - 1
          rangeinput()
        } else if(value === min) {
          setBubbleRight(true)
          range.current.value = parseInt(range.current.value) + 1
          rangeinput()
        } else if(bubbleRight) {
          range.current.value = parseInt(range.current.value) + 1
          rangeinput()
        } else {
          range.current.value =  parseInt(range.current.value) - 1
          rangeinput()
        }
        // setBubbleRight()
      }}>{ bubbleRenderer(value) }</div>
    </div>
  );
}

export default Slider;