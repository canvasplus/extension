<p align="center">
  <img width="288" src="https://raw.githubusercontent.com/adrWasTaken/CanvasPlus/master/extension/chrome/assets/icons/canvas-wide-red.png">
</p>
<h3 align="center">Boost your productivity right now.</h3>

<p align="center">Canvas+ is a free chrome extension that improves the experience of students using Canvas</p>
<br>
<p align="center">
<img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/users/kdkadcnebmokaadholinmnpjelphnghh?label=chrome%20users&color=important">
<img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/adrWasTaken/CanvasPlus">
<img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/rating/kdkadcnebmokaadholinmnpjelphnghh">
  
<br>
  <h5>Helpful Links</h5>
  <a href="https://canvasplus.adrwas.dev">Canvas+ Website</a><br>
  <a href="https://chrome.google.com/webstore/detail/canvas%2B/kdkadcnebmokaadholinmnpjelphnghh">Install the Extension</a><br>
  <a href="https://canvas.instructure.com/doc/api/">Canvas API Documentation</a><br>
  <a href="https://developer.chrome.com/docs/extensions/">Chrome Extension Documentation</a><br>
  <a href="https://jekyllrb.com/docs/">Jekyll (Used in website) Documentation</a>
</p>

<br>

# 📚  About
Canvas+ is a free chrome extension that improves the experience of students using Canvas, with support for the following toggleable features:

- Smart Scrolling
- Search Bar
- Faster Links
- Dark Mode

These can be toggled by clicking the extension popup.

<br><br>
# 📌  Known Issues
All code has errors, and Canvas+ is no exception. Here's all the known issues and their statuses:

<br>

#14 The search bar loading indicator is slightly too long when finished.

<br>

**Have a different issue?**

Be sure to report it in the <a href="https://github.com/adrWasTaken/CanvasPlus/issues">issues tab</a> and I'll do my best to fix it!

<br><br>
# 📅  Planned Features

Here's a list of some planned features for the extension, in order of when they're coming:

- Bug Fixes
- "Dim" Mode
- Email Peeker
- Quick Navigator
- Customize link & accent color
- Pin/bookmark pages
- Access zoom links from extension popup
- (Potential) Discussion signature
- (Potential) Automatically export course content for offline viewing
- Dashboard Overhaul

If you want to add any of these, I'll accept your pull request!
If you have an idea of your own, I'll probably also merge it, but you might want to check with me. You can contact me (<a href="https://github.com/adrWasTaken">more details on my github profile</a>), or make an issue in this repo, and I'll let you know what I think!

<br><br>
# 🖥️  Develop

I'm happy to collaborate on this and any pull request will be accepted if they improve the extension. *All chrome extensions are coded in JavaScript* and google has some great resources to learn more about developing chrome extensions. For now, here's a rundown of what everything does and some useful functions:

<br><br>
**manifest.json**

> The manifest file contains everything necessary for chrome to start the extension. Most should be pretty self-explanatory. If you want to add any sort of color modes and you're getting an error, you want to put a link to any programatically loaded css files in the `web_accessible_resources` array.

<br><br>
**popup files**

> Popup files are the HTML/CSS/JS for the popup shown when you click the extension button.

<br><br>
**quicklink.js**

> This is NOT my code. I barely know how it works, so DO NOT modify it.

<br><br>
**background.js**

> Unsurprisingly, this code is run in the background. Right now its only use is the 'Thank you for installing!' and update popups
