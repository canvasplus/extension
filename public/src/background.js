const main = async () => {
  const scriptingPermission = await chrome.permissions.contains({
    permissions: ["scripting"],
  });

  if (scriptingPermission) {
    // chrome.scripting.executeScript({
    //   target: { tabId: tab.id },
    //   files: ["content-script.js"],
    // });
  } else {
    // chrome.permissions.request({ permissions: ["scripting"] });
  }
};

main();
