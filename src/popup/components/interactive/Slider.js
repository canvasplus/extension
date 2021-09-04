// Modified from https://codesandbox.io/s/dazzling-galileo-01g0g?file=/src/App.js
import React,{useState} from "react";
import "./Slider.css";
const Slider = ({ state, setState, min, max }) => {

  const [ slider , setSlider ] = useState( state );

  const range = React.createRef();

  const onChanged = (num) => {
    setSlider(num)
    setState(num)
  }

  return (
    <div className="Slider">
      <input className="range" type="range" min={min} max={max} ref={range} onChange={(a, b) => {console.log(a, b); console.log(range.current);}}/>
      <div className="Slider__Bubble">{ slider }</div>
    </div>
  );
}

export default Slider;