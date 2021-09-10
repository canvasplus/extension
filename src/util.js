const getPathAPI = (rel) => {
    const url = new URL(window.location);
    return url.protocol + url.hostname + rel;
}

const reactiveToggledFeatures = {}

const useReactiveToggledFeature = (settingName, onEnabled, onDisabled) => {
    const setting = reactiveToggledFeatures[settingName];
 
    if(setting) {
        setting.push({ onEnabled, onDisabled })
    } else {
        reactiveToggledFeatures[settingName] = [{ onEnabled, onDisabled }];
    }

    chrome.storage.local.get([settingName], (data) => {
        if(data[settingName] === true) {
            onEnabled();
        }
    })
}

const reactiveFeatures = {}

const useReactiveFeature = (settingName, onChanged) => {
    const setting = reactiveFeatures[settingName]
 
    if(setting) {
        setting.push(onChanged)
    } else {
        reactiveFeatures[settingName] = [onChanged]
    }

    chrome.storage.local.get([settingName], (data) => {
        onChanged(data[settingName])
    })
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    Object.keys(changes).forEach(key => {
        const value = changes[key].newValue
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