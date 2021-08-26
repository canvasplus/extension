import React, { useState } from 'react'
import './LimitedColorSwitch.css'

export default function LimitedColorSwitch({ state, setState, generateTooltip }) {
    const popup = React.createRef()
    const [showPopup, setShowPopup] = useState(false)
    const [colorTop, setColorTop] = useState(state)
    
    const content = <LimitedColorSwitchContent generateTooltip={generateTooltip} state={colorTop} setState={(s) => { setColorTop(s); setState(s); }} setShowPopup={setShowPopup}></LimitedColorSwitchContent>;
    const popupElement = <><div className="LimitedColorSwitch_Popup" ref={popup}>
        {content}
        </div></>

    return (<>
        { showPopup ? <div className="overlay" onClick={ () => { setShowPopup(false) } }/> : <></> }
        <div className={`SettingInput LimitedColorSwitch_Shortcut si_lcs_s_${colorTop}`} style={{zIndex: showPopup ? 101 : 'unset', '--color': colorTop }}>
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

export function LimitedColorSwitchContent({ state, setState, setShowPopup, generateTooltip }) {
    const customInput = React.createRef()
    const [color, setColor] = useState(state)

    const onClicked = (col) => {
        setColor(col);
        setState(col);
        setToolTip(generateTooltip(col))
        setShowPopup(false);
    }

    const onMouseOver = (hoveredColor) => {
        setToolTip(<div style={color === hoveredColor || (!["black","white","unset"].includes(color) && hoveredColor === "custom") ? {} : {color: '#888'}}>{ generateTooltip(hoveredColor) }</div>);
    }

    const onMouseOut = () => {
        setToolTip(generateTooltip(color))
    }

    const [toolTip, setToolTip] = useState(generateTooltip(state))

    return <><div className="LimitedColorSwitch_Popup__Text">{ toolTip }</div>
    <div className="LimitedColorSwitch_Popup__Options" onMouseLeave={onMouseOut}>
        <LimitedColorSwitchOption color="white" onClicked={onClicked} onMouseOver={onMouseOver} />
        <LimitedColorSwitchOption color="black" onClicked={onClicked} onMouseOver={onMouseOver} />
        <LimitedColorSwitchOption color="unset" onClicked={onClicked} onMouseOver={onMouseOver} />
        <div className={`LimitedColorSwitch_Popup__ColorOption lcs_p_co_custom${['white','black','unset'].includes(color) ? '' : '_set'}`} onMouseEnter={() => { onMouseOver('custom') }} style={{cursor:'pointer','--color':color}}>
            <input type="color" style={{opacity:'0'}} ref={customInput} onChange={() => { const newColor = customInput.current.value; setColor(newColor); setState(newColor); setToolTip(generateTooltip(newColor)) }}/>
        </div>
    </div></>
}