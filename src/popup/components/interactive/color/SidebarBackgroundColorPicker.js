import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'
import styles from './SidebarBackgroundColorPicker.module.css'

export default function SidebarBackgroundColorPicker({ state, setState }) {
    
    const [showing, setShowing] = useState(false)

    const [backgroundColor, setBackgroundColor] = useState(state !== '' ? state : '#F4c46a')

    const [onGradientTab, setOnGradientTab] = useState(state.startsWith("linear-gradient"))

    return (
        <div className={`SettingInput ${styles.SidebarBackgroundColorPicker} ${backgroundColor !== '' ? '' : styles.SidebarBackgroundColorPickerUnset}`} style={{'--color': (backgroundColor !== '' ? backgroundColor : '#FFF')}}>
            <div className={styles.SidebarBackgroundColorPicker__Cover} onClick={() => { setShowing(true) }}></div>
            { showing ? 
                <>
                    <div className={styles.SidebarBackgroundColorPicker__Overlay} onClick={() => { setShowing(false) }}></div>

                    <div className={styles.SidebarBackgroundColorPicker__Popup}>
                        <div className={styles.SidebarBackgroundColorPicker__Tab}>
                            <div onClick={() => { setOnGradientTab(false) }} className={onGradientTab ? styles.SidebarBackgroundColorPicker__TabButton : styles.SidebarBackgroundColorPicker__TabButtonSelected}>Color</div>
                            <div onClick={() => { setOnGradientTab(true) }} className={!onGradientTab ? styles.SidebarBackgroundColorPicker__TabButton : styles.SidebarBackgroundColorPicker__TabButtonSelected}>Gradient</div>
                            <div onClick={() => { setOnGradientTab(false); setShowing(false); setState(''); setBackgroundColor('') }} className={styles.SidebarBackgroundColorPicker__TabButtonReset}>
                                <div className={styles.SidebarBackgroundColorPicker__TabButtonResetInner} />
                            </div>
                        </div>
                        {
                            !onGradientTab ?
                            <div style={{padding:10}} className={"SidebarBackgroundColorPicker__ColorPicker"}>
                                <SketchPicker width={180} disableAlpha={true} color={backgroundColor} onChange={(c) => {setBackgroundColor(c)}} onChangeComplete={(c) => {setBackgroundColor(c.hex); setState(c.hex)}} presetColors={[
                                    '#e0245e', '#ffad1f', '#85c924', '#40afe3', '#6b54ff',  '#fc74e1', '#515975', '#222a42',
                                    '#b5043a', '#f45d22', '#17bf63', '#1059e3', '#794bc4', '#c840e3'
                                ]}/>
                            </div> :
                            <SidebarBackgroundGradientPicker state={state} setState={(state) => { setBackgroundColor(state); setState(state)}}
                            initialColors={backgroundColor.startsWith('linear-gradient') ? extractLinearGradient(backgroundColor) : [getRandomColor(), getRandomColor()]} />
                        }
                    </div>
                </> : <></>
            }
        </div>
    )
}

export function SidebarBackgroundGradientPicker({ state, setState, initialColors }) {

    const [color1, setColor1] = useState(initialColors[0])
    const [color2, setColor2] = useState(initialColors[1])

    useEffect(() => {
        // setState(`linear-gradient(45deg, ${color1}, ${color2})`);
    }, [])


    const [tab, setTab] = useState(0)

    return <div className={styles.SidebarBackgroundGradientPicker} style={{'--color1': color1, '--color2': color2}}>
        <div className={styles.SidebarBackgroundColorPicker__Tab}>
            <div onClick={() => { setTab(0) }} className={ (tab === 0 ? styles.SidebarBackgroundColorPicker__TabButtonSelected : styles.SidebarBackgroundColorPicker__TabButton) + ' ' + styles.SidebarBackgroundColorPicker__TabButton__GradientPreview } >Preview</div>
            <div onClick={() => { setTab(1) }} className={ (tab === 1 ? styles.SidebarBackgroundColorPicker__TabButtonSelected : styles.SidebarBackgroundColorPicker__TabButton) + ' ' + styles.SidebarBackgroundColorPicker__TabButton__Gradient1 } ></div>
            <div onClick={() => { setTab(2) }} className={ (tab === 2 ? styles.SidebarBackgroundColorPicker__TabButtonSelected : styles.SidebarBackgroundColorPicker__TabButton) + ' ' + styles.SidebarBackgroundColorPicker__TabButton__Gradient2 } ></div>
        </div>
        {
            tab === 0 ? (
                <div className={styles.SidebarBackgroundGradientPicker__Gradient}></div>
            ) : <></>
        }
        {
            tab === 1 ? (
                <div style={{padding:10}} className={"SidebarBackgroundColorPicker__ColorPicker"}>
                    <SketchPicker width={160} disableAlpha={true} color={color1} onChange={(c) => {setColor1(c.hex)}} onChangeComplete={(c) => {setColor1(c.hex); setState(`linear-gradient(45deg, ${c.hex}, ${color2})`)}} presetColors={[
                        '#e0245e', '#ffad1f', '#85c924', '#40afe3', '#6b54ff',  '#fc74e1', '#515975', '#222a42',
                        '#b5043a', '#f45d22', '#17bf63', '#1059e3', '#794bc4', '#c840e3'
                    ]}/>
                </div>
            ) : <></>
        }
        {
            tab === 2 ? (
                <div style={{padding:10}} className={"SidebarBackgroundColorPicker__ColorPicker"}>
                    <SketchPicker width={160} disableAlpha={true} color={color2} onChange={(c) => {setColor2(c.hex)}} onChangeComplete={(c) => {setColor2(c.hex); setState(`linear-gradient(45deg, ${color1}, ${c.hex})`)}} presetColors={[
                        '#e0245e', '#ffad1f', '#85c924', '#40afe3', '#6b54ff',  '#fc74e1', '#515975', '#222a42',
                        '#b5043a', '#f45d22', '#17bf63', '#1059e3', '#794bc4', '#c840e3'
                    ]}/>
                </div>
            ) : <></>
        }
        {
            
            // tab === 0 ? 
            //     (
            //         <div className={styles.SidebarBackgroundGradientPicker__Gradient}></div>
            //     )
            // : ( tab === 1 ?
            //     (
            //         <div style={{padding:10}} className={"SidebarBackgroundColorPicker__ColorPicker"}>
            //             <SketchPicker width={160} disableAlpha={true} color={color1} onChange={(c) => {setColor1(c.hex)}} onChangeComplete={(c) => {setColor1(c.hex); setState(`linear-gradient(45deg, ${c.hex}, ${color2})`)}} presetColors={[
            //                 '#e0245e', '#ffad1f', '#85c924', '#40afe3', '#6b54ff',  '#fc74e1', '#515975', '#222a42',
            //                 '#b5043a', '#f45d22', '#17bf63', '#1059e3', '#794bc4', '#c840e3'
            //             ]}/>
            //         </div>
            //     )
            // : (
            //     <div style={{padding:10}} className={"SidebarBackgroundColorPicker__ColorPicker"}>
            //         <SketchPicker width={160} disableAlpha={true} color={color2} onChange={(c) => {setColor2(c.hex)}} onChangeComplete={(c) => {setColor2(c.hex); setState(`linear-gradient(45deg, ${color1}, ${c.hex})`)}} presetColors={[
            //             '#e0245e', '#ffad1f', '#85c924', '#40afe3', '#6b54ff',  '#fc74e1', '#515975', '#222a42',
            //             '#b5043a', '#f45d22', '#17bf63', '#1059e3', '#794bc4', '#c840e3'
            //         ]}/>
            //     </div>
            // )
            // )
        }
    </div>
}

const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16).toString(16) + Math.floor(Math.random() * 16).toString(16) + Math.floor(Math.random() * 16).toString(16)
}

const extractLinearGradient = (gradient) => {
    let ai = gradient.indexOf(',') + 1;
    let a = gradient.substr(ai, gradient.substr(ai).indexOf(','));
    let b = gradient.substring(ai + a.length + 1, gradient.trim().length - 1);
    return [a.trim(), b.trim()]
}