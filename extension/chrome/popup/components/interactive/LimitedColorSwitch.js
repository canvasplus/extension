import React, { useState } from 'react'
import './LimitedColorSwitch.css'

export default function LimitedColorSwitch({ state, setState }) {
    const textInput = React.createRef()
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
        setToolTip(<div style={color === hoveredColor ? {} : {color: '#888'}}>{ generateTooltop(hoveredColor) }</div>);
    }

    const onMouseOut = () => {
        setToolTip(generateTooltop(color))
    }

    const generateTooltop = (color) => {
        if(color === "unset") {
            return <><b>Default Icons</b><p>Sidebar icons will inherit the default colors of your school.</p></>;
        } else if(color === "invert") {
            return <><b>Contrasting Icons</b><p>Sidebar icons will contrast by using an opposite color.</p></>;
        } else {
            return <><b>{ color.charAt(0).toUpperCase() + color.slice(1) } Icons</b><p>Sidebar icons will always appear in { color }.</p></>
        }
    }

    const [toolTip, setToolTip] = useState(generateTooltop(state))
    
    const popupElement = <><div className="LimitedColorSwitch_Popup" ref={popup}>
            <div className="LimitedColorSwitch_Popup__Text">{ toolTip }</div>
            <div className="LimitedColorSwitch_Popup__Options">
                <LimitedColorSwitchOption color="white" onClicked={onClicked} onMouseOver={onMouseOver} onMouseOut={onMouseOut}/>
                <LimitedColorSwitchOption color="black" onClicked={onClicked} onMouseOver={onMouseOver} onMouseOut={onMouseOut}/>
                <LimitedColorSwitchOption color="unset" onClicked={onClicked} onMouseOver={onMouseOver} onMouseOut={onMouseOut}/>
                <LimitedColorSwitchOption color="invert" onClicked={onClicked} onMouseOver={onMouseOver} onMouseOut={onMouseOut}/>
            </div>
        </div></>

    return (<>
        { showPopup ? <div className="overlay" onClick={ () => { setShowPopup(false) } }/> : <></> }
        <div className={`SettingInput LimitedColorSwitch_Shortcut si_lcs_s_${color}`} style={{zIndex: showPopup ? 101 : 'unset' }}>
            <div className="SettingInput LimitedColorSwitch_Shortcut__Hover" onClick={ () => {
                setShowPopup(true)
            } } />
            { showPopup ? popupElement : <></> }
        </div>
    </>)
}

export function LimitedColorSwitchOption({ color, gridArea, onClicked, onMouseOver, onMouseOut }) {
    return <div className={`LimitedColorSwitch_Popup__ColorOption lcs_p_co_${color}`} style={{gridArea: gridArea}} onClick={() => { onClicked(color) }} onMouseEnter={() => { onMouseOver(color) }} onMouseLeave={() => { onMouseOut(color) }} />
}