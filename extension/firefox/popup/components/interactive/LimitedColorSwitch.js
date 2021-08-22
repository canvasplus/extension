import React, { useState } from 'react'
import './LimitedColorSwitch.css'

export default function LimitedColorSwitch({ state, setState }) {
    const customInput = React.createRef()
    const popup = React.createRef()

    const [color, setColor] = useState(state)
    const [showPopup, setShowPopup] = useState(false)

    const onClicked = (color) => {
        setColor(color);
        setState(color);
        setShowPopup(false);
        setToolTip(generateTooltop(color))
    }

    const onMouseOver = (hoveredColor) => {
        setToolTip(<div style={color === hoveredColor || (!["black","white","unset"].includes(color) && hoveredColor === "custom") ? {} : {color: '#888'}}>{ generateTooltop(hoveredColor) }</div>);
    }

    const onMouseOut = () => {
        setToolTip(generateTooltop(color))
    }

    const generateTooltop = (color) => {
        if(color === "unset") {
            return <><b>Default Icons</b><p>Sidebar icons will inherit the default colors of your school.</p></>;
        } else if(["black","white"].includes(color)) {
            return <><b>{ color.charAt(0).toUpperCase() + color.slice(1) } Icons</b><p>Sidebar icons will always appear in { color }.</p></>
        } else {
            return <><b>Custom Icons</b><p>Click to open a color wheel and chose a custom icon color.</p></>;
        }
    }

    const [toolTip, setToolTip] = useState(generateTooltop(state))
    
    const popupElement = <><div className="LimitedColorSwitch_Popup" ref={popup}>
            <div className="LimitedColorSwitch_Popup__Text">{ toolTip }</div>
            <div className="LimitedColorSwitch_Popup__Options" onMouseLeave={onMouseOut}>
                <LimitedColorSwitchOption color="white" onClicked={onClicked} onMouseOver={onMouseOver} />
                <LimitedColorSwitchOption color="black" onClicked={onClicked} onMouseOver={onMouseOver} />
                <LimitedColorSwitchOption color="unset" onClicked={onClicked} onMouseOver={onMouseOver} />
                <div className={`LimitedColorSwitch_Popup__ColorOption lcs_p_co_custom${['white','black','unset'].includes(color) ? '' : '_set'}`} onMouseEnter={() => { onMouseOver('custom') }} style={{cursor:'pointer','--color':color}}>
                    <input type="color" style={{opacity:'0'}} ref={customInput} onChange={() => { const newColor = customInput.current.value; setColor(newColor); setState(newColor); setToolTip(generateTooltop(newColor)) }}/>
                </div>
            </div>
        </div></>

    return (<>
        { showPopup ? <div className="overlay" onClick={ () => { setShowPopup(false) } }/> : <></> }
        <div className={`SettingInput LimitedColorSwitch_Shortcut si_lcs_s_${color}`} style={{zIndex: showPopup ? 101 : 'unset', '--color': color }}>
            <div className="SettingInput LimitedColorSwitch_Shortcut__Hover" onClick={ () => {
                setShowPopup(true)
            } } />
            { showPopup ? popupElement : <></> }
        </div>
    </>)
}

export function LimitedColorSwitchOption({ color, onClicked, onMouseOver }) {
    return <div className={`LimitedColorSwitch_Popup__ColorOption lcs_p_co_${color}`} onClick={() => { onClicked(color) }} onMouseEnter={() => { onMouseOver(color) }} />
}