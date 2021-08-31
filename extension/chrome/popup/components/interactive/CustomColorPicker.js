import React, { useState } from 'react'
import { SketchPicker } from 'react-color'
import './CustomColorPicker.css'

export default function CustomColorPicker({ color, onChange, showing, setShowing }) {

    return (
        <div className={`CustomColorPicker${showing ? '' : '_disabled'}`}>
            { showing ? <>
            <div className="CustomColorPicker__Overlay" onClick={() => { console.log("setting showing to false"); setShowing(false) }}></div>
            <div className="CustomColorPicker__Picker">
                <SketchPicker color={color} onChangeComplete={(c) => {onChange(c.hex)}} />
            </div>
            </> : <></> }
        </div>
    )
}
