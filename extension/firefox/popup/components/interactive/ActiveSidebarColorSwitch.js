import React, { useState } from 'react'
import './ActiveSidebarColorSwitch.css'
import { LimitedColorSwitchContent } from './LimitedColorSwitch.js'

export default function ActiveSidebarColorSwitch({ state, setState }) {
    const customInput = React.createRef()
    const popup = React.createRef()

    const [color, setColor] = useState(state.background)
    const [icon, setIcon] = useState(state.icon)
    
    const [showPopup, setShowPopup] = useState(false)
    
    const generateTooltip = (color) => {if(color === "white") {return <><b>White Active Background</b><p>The active sidebar button will have a white background.</p></>;} else if(color === "blend") {return <><b>Blended Active Background</b><p>The active button color will match your Canvas appearance.</p></>;} else if(color === "darker") {return <><b>Darker Active Background</b><p>The active button will be slightly darker than the rest of the sidebar.</p></>;} else {return <><b>Custom Active Background</b><p>Click to open a color wheel and chose a custom active background color.</p></>;}}
    

    const onClicked = (color) => {
        setColor(color);
        setState({ background: color, icon: icon });
        setToolTip(generateTooltip(color))
    }

    const onMouseOver = (hoveredColor) => {
        setToolTip(<div style={color === hoveredColor || (!["white","blend","darker"].includes(color) && hoveredColor === "custom") ? {} : {color: '#888'}}>{ generateTooltip(hoveredColor) }</div>);
    }

    const onMouseOut = () => {
        setToolTip(generateTooltip(color))
    }


    const [toolTip, setToolTip] = useState(generateTooltip(state.background))
    
    const popupElement = <><div className="ActiveSidebarColorSwitch_Popup" ref={popup}>
            <div className="ActiveSidebarColorSwitch_Popup__Text">{ toolTip }</div>
            <div className="ActiveSidebarColorSwitch_Popup__Options" onMouseLeave={onMouseOut}>
                <ActiveSidebarColorSwitchOption color="white" onClicked={onClicked} onMouseOver={onMouseOver} />
                <ActiveSidebarColorSwitchOption color="blend" onClicked={onClicked} onMouseOver={onMouseOver} />
                <ActiveSidebarColorSwitchOption color="darker" onClicked={onClicked} onMouseOver={onMouseOver} />
                <div className={`ActiveSidebarColorSwitch_Popup__ColorOption ascs_p_co_custom${['white','blend','darker'].includes(color) ? '' : '_set'}`} onMouseEnter={() => { onMouseOver('custom') }} style={{cursor:'pointer','--color':color}}>
                    <input type="color" style={{opacity:'0'}} ref={customInput} onChange={() => { const newColor = customInput.current.value; setColor(newColor); setState({ background: newColor, icon: icon}); setToolTip(generateTooltip(newColor)) }}/>
                </div>
            </div>
            <div style={{borderTop:'1px solid #e3e3e3',margin:'20px auto',width:160}} />
            <LimitedColorSwitchContent state={icon} setState={(s) => { setIcon(s); setState({background: color, icon: s})}} setShowPopup={() => {}} generateTooltip={(color) => {if(color === "unset") {return <><b>Default Active Icon</b><p>The active icon will inherit the default colors of your school.</p></>;} else if(["black","white"].includes(color)) {return <><b>{ color.charAt(0).toUpperCase() + color.slice(1) } Active Icon</b><p>The active icon will always appear in { color }.</p></>} else {return <><b>Custom Active Icon</b><p>Click to open a color wheel and chose a custom icon color.</p></> }}} />
        </div></>

    return (<>
        { showPopup ? <div className="overlay" onClick={ () => { setShowPopup(false) } }/> : <></> }
        <div className={`SettingInput ActiveSidebarColorSwitch_Shortcut si_ascs_s_${color}`} style={{zIndex: showPopup ? 101 : 'unset', '--color': ['white','blend','darker'].includes(color) ? undefined : color }}>
            <div className="SettingInput ActiveSidebarColorSwitch_Shortcut__Hover" onClick={ () => {
                setShowPopup(true)
            } }>
                { color !== "blend" ? <></> : <div className='ascs_s_h_blend' /> }
            </div>
            { showPopup ? popupElement : <></> }
        </div>
    </>)
}

export function ActiveSidebarColorSwitchOption({ color, onClicked, onMouseOver }) {
    return <div className={`ActiveSidebarColorSwitch_Popup__ColorOption ascs_p_co_${color}`} onClick={() => { onClicked(color) }} onMouseEnter={() => { onMouseOver(color) }} style={color === "darker" ? {'--color': '#888'} : {} } />
}