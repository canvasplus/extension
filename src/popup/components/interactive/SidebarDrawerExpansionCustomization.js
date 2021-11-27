import React, { useState, useEffect } from 'react'
import './SidebarDrawerExpansionCustomization.css'

export default function SidebarDrawerExpansionCustomization({ featureEnabled }) {
    const [leftSide, setLeftSide] = useState([])
    const [rightSide, setRightSide] = useState([])

    useEffect(() => {
        chrome.storage.local.get(["canvasplus-setting-sidebar-drawer-all-items", "canvasplus-setting-sidebar-drawer-excluded"], (data) => {
            const all = data["canvasplus-setting-sidebar-drawer-all-items"] || []
            const excluded = data["canvasplus-setting-sidebar-drawer-excluded"] || []

            setLeftSide(generateExcluded(all, excluded));

            setRightSide(generateIncluded(all, excluded))
        })
    }, [])

    const generateExcluded = (all, excluded) => {
        return excluded.filter(item => {
            return all.includes(item)
        })
    }

    const generateIncluded = (all, excluded) => {
        return all.filter(item => {
            return !excluded.includes(item)
        })
    }

    return (
        <div className="SidebarDrawerExpansionCustomization">
            {
                featureEnabled ? <></> :
                <div className="SidebarDrawerExpansionCustomization__Disabled">
                    Your sidebar drawer is currently <b>disabled</b>, so your changes won't take effect yet.
                </div>
            }

            <div className="SidebarDrawerExpansionCustomization__Info">
                <b>Customize your Sidebar</b>
                <p>Canvas+ allows you to stash unneeded sidebar buttons into a drawer, accessible by clicking "More".</p>
            </div>

            <div className="SidebarDrawerExpansionCustomization__Cards">
                <div className="SidebarDrawerExpansionCustomization__Left">
                    {
                        leftSide.length > 0 ? leftSide.map(item => {
                            
                            const onClicked = () => {
                                
                                chrome.storage.local.get(["canvasplus-setting-sidebar-drawer-excluded"], (data) => {
                                    const excluded = data["canvasplus-setting-sidebar-drawer-excluded"];
                                    if(excluded) {
                                        excluded.splice(excluded.indexOf(item), 1);
                                        chrome.storage.local.set({"canvasplus-setting-sidebar-drawer-excluded": excluded})
                                    } 
                                })

                                const newLeftSide = leftSide;
                                newLeftSide.splice(newLeftSide.indexOf(item), 1)
                                setLeftSide(Array.from(newLeftSide))

                                const newRightSide = rightSide;
                                newRightSide.push(item)
                                setRightSide(Array.from(newRightSide))

                            }

                            return <div onClick={onClicked}>
                                <p>{ item }</p>
                                <p>Shown</p>
                            </div>

                        }) : <div className="none">
                            <p>No Shown Buttons</p>
                        </div>
                    }
                </div>


                <div className="SidebarDrawerExpansionCustomization__Right">
                    {
                        rightSide.length > 0 ? rightSide.map(item => {
                            
                            const onClicked = () => {
                                
                                chrome.storage.local.get(["canvasplus-setting-sidebar-drawer-excluded"], (data) => {
                                    const excluded = data["canvasplus-setting-sidebar-drawer-excluded"];
                                    if(excluded) {
                                        excluded.push(item);
                                        chrome.storage.local.set({"canvasplus-setting-sidebar-drawer-excluded": excluded})
                                    } 
                                })

                                const newLeftSide = leftSide;
                                newLeftSide.push(item)
                                setLeftSide(Array.from(newLeftSide))
                                
                                const newRightSide = rightSide;
                                newRightSide.splice(newRightSide.indexOf(item), 1)
                                setRightSide(Array.from(newRightSide))
                            }

                            return <div onClick={onClicked}>
                                <p>{ item }</p>
                                <p>Hidden</p>
                            </div>

                        }) :  <div className="none">
                            <p>No Hidden Buttons</p>
                        </div>
                    }
                </div>
            </div>

            <div className="SidebarDrawerExpansionCustomization__Info">
                <b>Not Seeing All Buttons?</b>
                <p>Open and log in to Canvas to see your sidebar buttons here.</p>
            </div>
        </div>
    )
}
