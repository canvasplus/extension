// Modifyed from https://codesandbox.io/s/dazzling-galileo-01g0g?file=/src/App.js
import React,{useState} from "react";
import "./slider.css";
const Slider = () => {
  const [value,onChange]=useState(1);

  return (
    <div className="slider-parent">
      <input className="range" type="range" min="2" max="10" defaultValue="8" onChange={({ target: { value: radius } }) => {onChange(radius);}}/>
      <div className="bubble"> {value} </div>
    </div>
  );
}

export default Slider;