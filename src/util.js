const onMac = window.navigator.platform === 'MacIntel'

const smartAPIFetch = async (url) => {
    const response = await fetch( url )
    
    //const headers = response.headers.entries()
    // let currentHeaderIt = headers.next()
    // let remain = undefined
    // let cost = undefined
    // while(!currentHeaderIt.done) {
    //     if(currentHeaderIt.value[0] === "x-rate-limit-remaining") {
    //         remain = currentHeaderIt.value[1]
    //     }
    //     if(currentHeaderIt.value[0] === "x-request-cost") {
    //         cost = currentHeaderIt.value[1]
    //     }
    //     if(remain && cost) {
    //         break;
    //     }
    //     currentHeaderIt = headers.next()
    // }

    return response
}

const smartSplit = (toSplit) => {
    const blocks = []
    let currentBlock = ""
    for(let char of toSplit) {
        if(char.match(/^[a-zA-Z0-9]*$/)) {
            currentBlock += char
        } else {
            if(currentBlock !== "") {
                blocks.push(currentBlock.toLowerCase())
                currentBlock = ""
            }
        }
    }
    if(currentBlock !== "") {
        blocks.push(currentBlock.toLowerCase())
        currentBlock = ""
    }
    return blocks
}

const filterAlphanumeric = (toFilter) => {
    return toFilter.replace(/[^0-9a-z]/gi, '')
}

const getPathAPI = (rel) => {
    const url = new URL(window.location);
    return url.origin + rel;
}

const reactiveToggledFeatures = {}

const useReactiveToggledFeatures = (features) => {
    const settingNames = {}
    features.forEach(feature => {
        useReactiveToggledFeature(feature.settingName, feature.onEnabled, feature.onDisabled, false)
        settingNames[feature.settingName] = feature
    })
    chrome.storage.local.get( Object.keys(settingNames).filter(settingName => {
        const session = sessionStorage.getItem('storage-cache-' + settingName)
        if(session !== undefined) {
            settingNames[settingName].onChanged(session)
            return false;
        }
        return true;
    }), (data) => {
        Object.keys(data).forEach(key => {
            settingNames[key].onEnabled()
        })
    })
}

const useReactiveToggledFeature = (settingName, onEnabled, onDisabled, readInitially=true) => {
    const setting = reactiveToggledFeatures[settingName];
 
    if(setting) {
        setting.push({ onEnabled, onDisabled })
    } else {
        reactiveToggledFeatures[settingName] = [{ onEnabled, onDisabled }];
    }

    if(readInitially) {
        const session = sessionStorage.getItem('storage-cache-' + settingName);
        if(session !== undefined) {
            onChanged(session)
        } else {
            chrome.storage.local.get([settingName], (data) => {
                if(data[settingName] === true) {
                    onEnabled();
                }
            })
        }
    }
}

const reactiveFeatures = {}

const useReactiveFeatures = (features) => {
    const settingNames = {}
    features.forEach(feature => {
        useReactiveFeature(feature.settingName, feature.onChanged, false)
        settingNames[feature.settingName] = feature
    })
    chrome.storage.local.get( Object.keys(settingNames).filter(settingName => {
        const session = sessionStorage.getItem('storage-cache-' + settingName)
        if(session == true) {
            try {
                const json = JSON.parse(session)
                settingNames[settingName].onChanged(json)
            } catch {
                settingNames[settingName].onChanged(session)
            }
        }
        return true;
    }), (data) => {
        Object.keys(data).forEach(key => {
            settingNames[key].onChanged(data[key])
        })
    })
}

const useReactiveFeature = (settingName, onChanged, readInitially=true) => {
    const setting = reactiveFeatures[settingName]
 
    if(setting) {
        setting.push(onChanged)
    } else {
        reactiveFeatures[settingName] = [onChanged]
    }

    if(readInitially) {
        const session = sessionStorage.getItem('storage-cache-' + settingName);
        if(session) {
            try {
                const json = JSON.parse(session)
                onChanged(json)
            } catch {
                onChanged(session)
            }
        } else {
            chrome.storage.local.get([settingName], (data) => {
                onChanged(data[settingName])
            })
        }
    }
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    Object.keys(changes).forEach(key => {
        const value = changes[key].newValue
        
        if(typeof value === 'object') {
            sessionStorage.setItem('storage-cache-' + key, JSON.stringify(value));
        } else {
            sessionStorage.setItem('storage-cache-' + key, value);
        }
    

        if(reactiveToggledFeatures[key]) {
            reactiveToggledFeatures[key].forEach(feature => {
                if(value) {
                    feature.onEnabled()
                } else {
                    feature.onDisabled()
                }
            })
        }
        if(reactiveFeatures[key]) {
            reactiveFeatures[key].forEach(feature => {
                feature(value);
            })
        }
    });
})

const stylingRules = []

class StylingRule {
    constructor(rule) {
        this.rule = rule
    }
    
    setRule(rule) {
        this.rule = rule;
        
        if(rule === undefined) {
            stylingRules.splice(stylingRules.indexOf(this), 1)    
        }

        else {
            let allRules = ''
            stylingRules.forEach(sr => {
                let r = sr.rule.trim()
                if(!r.endsWith(';')) r += ';'
                allRules += r
            })
            document.querySelector('html').style = allRules
        }
    }
}

const addStylingRule = (rule) => {
    const stylingRule = new StylingRule(rule)
    stylingRules.push(stylingRule)

    let allRules = ''
    stylingRules.forEach(sr => {
        let r = sr.rule.trim()
        if(!r.endsWith(';')) r += ';'
        allRules += r
    })
    document.querySelector('html').style = allRules

    return stylingRule
}

const compareWords = (ref, sub) =>  {
    const refAna = {}
    ref.split("").forEach(ref => { // sort words into object with quantities of letters
        refAna[ref] = (refAna[ref] || 0) + 1
    })
    
    const subAna = {}
    sub.split("").forEach(sub => { // sort words into object with quantities of letters
        subAna[sub] = (subAna[sub] || 0) + 1
    })

    let missing = [] // chars in ref not in sub
    let stray = [] // chars in sub not in ref

    Object.keys(refAna).forEach(ref => { // add missing chars to missing
        const quantity = refAna[ref] || 0
        const subQuantity = subAna[ref] || 0
        if(quantity > subQuantity) {
            missing = missing.concat(Array(quantity - subQuantity).fill(ref))
        }
    })

    Object.keys(subAna).forEach(sub => { // add stray chars to stray
        const quantity = refAna[sub] || 0
        const subQuantity = subAna[sub] || 0
        if(subQuantity > quantity) {
            stray = stray.concat(Array(subQuantity - quantity).fill(sub))
        }
    })

    // calculate score
    let score = Math.min((ref.length - (missing.length + stray.length * 0.5) + (ref.includes(sub) || sub.includes(ref) ? 2 : 0)) / ref.length, 1) * /*Math.min(ref.length, sub.length)*/ ref.length
    
    return score
};

const delayedQuerySelector = (selector) => { // from https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}

    let pointerX = undefined;
    let pointerY = undefined;

    window.addEventListener('mousemove', (e) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
    })

