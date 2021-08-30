import React, { useState } from 'react'
import './ColorSwitch.css'

export default function ColorSwitch({ state, setState }) {
    const textInput = React.createRef()
    const popup = React.createRef()

    const [color, setColor] = useState(state)
    const [showPopup, setShowPopup] = useState(false)


    const onClicked = (color) => {
        textInput.current.value = color.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/) ? color : 'use default';
        setColor(textInput.current.value);
        setState(textInput.current.value);
        setShowPopup(false)
    }
    
    const popupElement = <><div className="ColorSwitch_Popup" ref={popup}>
            <ColorSwitchOption color="#e0245e" gridArea="color-1-1" onClicked={onClicked} />
            <ColorSwitchOption color="#ffad1f" gridArea="color-1-2" onClicked={onClicked} />
            <ColorSwitchOption color="#85c924" gridArea="color-1-3" onClicked={onClicked} />
            <ColorSwitchOption color="#40afe3" gridArea="color-1-4" onClicked={onClicked} />
            <ColorSwitchOption color="#6b54ff" gridArea="color-1-5" onClicked={onClicked} />
            <ColorSwitchOption color="#fc74e1" gridArea="color-1-6" onClicked={onClicked} />
            <ColorSwitchOption color="#515975" gridArea="color-1-7" onClicked={onClicked} />
            <ColorSwitchOption color="#222a42" gridArea="color-1-8" onClicked={onClicked} />
            <div className="ColorSwitch_Popup__ColorOption cs_p_co_unset" style={{ '--color': '#E8E8E8', gridArea: 'color-1-9'}} onClick={() => { onClicked('') }} />
            <ColorSwitchOption color="#b5043a" gridArea="color-2-1" onClicked={onClicked} />
            <ColorSwitchOption color="#f45d22" gridArea="color-2-2" onClicked={onClicked} />
            <ColorSwitchOption color="#17bf63" gridArea="color-2-3" onClicked={onClicked} />
            <ColorSwitchOption color="#1059e3" gridArea="color-2-4" onClicked={onClicked} />
            <ColorSwitchOption color="#794bc4" gridArea="color-2-5" onClicked={onClicked} />
            <ColorSwitchOption color="#c840e3" gridArea="color-2-6" onClicked={onClicked} />
            <input type='text' className="ColorSwitch_Popup__ColorCustomInput" ref={textInput} defaultValue={color === '' ? 'use default' : color} style={{ gridArea: 'color-custom-input', '--color-custom-input-result-outline': color.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/) ? '1px solid blue' : '1px solid red' }} onChange={() => { setColor(textInput.current.value.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/) ? textInput.current.value : ''); setState(textInput.current.value.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/) ? textInput.current.value : '')}}/>
        </div></>

    return (<>
        { showPopup ? <div className="overlay" onClick={ () => { setShowPopup(false) } }/> : <></> }
        <div className="SettingInput ColorSwitch_Shortcut" style={{ '--color': color.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/) ? color : '#FFF', zIndex: showPopup ? 101 : 'unset' }}>
            <div className='SettingInput ColorSwitch_Shortcut__Hover' onClick={ () => {
                setShowPopup(true)
            } }>
                { color.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/) ? <></> : <div className='cs_s_h_unset' /> }
            </div>

            { showPopup ? popupElement : <></> }
        </div>
    </>)
}

export function ColorSwitchOption({ color, gridArea, onClicked }) {
    return <div className="ColorSwitch_Popup__ColorOption" style={{ '--color': color, gridArea: gridArea}} onClick={() => { onClicked(color) }} />
}