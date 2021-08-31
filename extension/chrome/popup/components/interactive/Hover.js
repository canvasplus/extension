import React from 'react';
import './Hover.css';

function Hover() {
  function click() {
    window.open("https://canvasplus.adrwas.dev/update/patch-0-3")
  }

  return (
    <div onClick={click} className="Hover">
      <div className="HoverText">Click to view Changelog</div>
    </div>
  );
}

export default Hover;
