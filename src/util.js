const smartAPIFetch = async (url) => {
    const response = await fetch(url)
    
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

const getPathAPI = (rel) => {
    const url = new URL(window.location);
    return url.protocol + '//' + url.hostname + rel;
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