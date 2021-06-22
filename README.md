<p align="center">
  <img width="288" src="https://raw.githubusercontent.com/adrWasTaken/CanvasPlus/master/extension/chrome/assets/icons/canvas-wide-red.png">
</p>
<h3 align="center">Boost your productivity right now.</h3>

<p align="center">Canvas+ is a free chrome and firefox extension that improves the experience of students using Canvas</p>
<br>
<p align="center">
<img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/users/kdkadcnebmokaadholinmnpjelphnghh?label=Chrome%20Users&color=important">
<img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/adrWasTaken/CanvasPlus">
<img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/rating/kdkadcnebmokaadholinmnpjelphnghh?label=Chrome%20Rating">
  
<br>
  
<img alt="Mozzila Addons" src="https://img.shields.io/amo/users/canvas-for-firefox?color=orange&label=Firefox%20Users">
<img alt="Mozzila Addons" src="https://img.shields.io/amo/rating/canvas-for-firefox?label=Firefox%20Rating">

<br>
  <h5>Helpful Links</h5>
  <a href="https://canvasplus.adrwas.dev">Canvas+ Website</a><br>
  <a href="https://chrome.google.com/webstore/detail/canvas%2B/kdkadcnebmokaadholinmnpjelphnghh">Install The Chrome Extension</a><br>
  <a href="Insert Link">Install The Firefox Extension (Coming Soon)</a><br>
  <a href="https://canvas.instructure.com/doc/api/">Canvas API Documentation</a><br>
  <a href="https://developer.chrome.com/docs/extensions/">Chrome Extension Documentation</a><br>
  <a href="https://jekyllrb.com/docs/">Jekyll (Used in website) Documentation</a>
</p>

<br>

<br><br>
# ⚠️ Important Notice About Summer Updates - 5/26
The extension is always being maintained, but during the summer, updates\* will NOT be released on chrome (Firefox will still recive updates though). For people doing summer school and/or really interested in the project, updates WILL be released on GitHub. All updates made over the summer will be released in one large update around the end of August. I've decided to not update major web browsers because updating the extension would generally involve a popup letting people know the extension has been updated. I don't imagine people want to think about school during the summer, and I wouldn't want to risk losing any users when we could just not bother anyone by releasing all the summer changes at the end of August. \*The one exception to this is if someone ports the extension to a new browser, I'll publish it to its web store over the summer, since there's no active users who could be annoyed by an update notification.

Also, you can expect less updates over the summer in general, because its harder to develop when you don't have courses that are actively being updated.
Thanks!

<br><br>

# 📚  About
Canvas+ is a free chrome and firefox extension that improves the experience of students using Canvas, with support for the following toggleable features:

- Smart Scrolling
- Search Bar
- Faster Links
- Dark Mode

These can be toggled by clicking the extension popup.

<br><br>
#### ⚠️ If you're interested in porting this to another browser, do NOT publish it! Why?
It's really inconvenient for me, the maintainer of this project, to go to you whenever I want to push out an update. I can't garuantee that you'll be active on GitHub and/or willing to maintain the extension, so its much better if I own the extension. If you wan't to port to another browser, fork this repo, make the port, pull request, and I'll do the work of publishing it.

<br><br>
# 📌  Known Issues
All code has errors, and Canvas+ is no exception. Here's all the known issues and their statuses:

<br>

#14 The search bar loading indicator is slightly too long when finished. Mosty effects firefox, but still effects chrome a little.

#15 Search bar appears in wrong place in conversations page

<br>

**Have a different issue?**

Be sure to report it in the <a href="https://github.com/adrWasTaken/CanvasPlus/issues">issues tab</a> and I'll do my best to fix it!

<br><br>
# 📅  Planned Features

Here's a list of some planned features for the extension, in order of when they're coming:

🟢 = Ready

🟡 = In Progress

🔴 = To Do

- 🟡 Bug Fixes
- 🟡 Remake popup using react
- 🟡 "Dim" Mode
- 🟡 Email Peeker
- 🔴 Drag and drop to upload
- 🔴 Upload from clipboard
- 🟡 Change sidebar: Hide branding, change size, etc
- 🟡 Quick Navigator
- 🟡 Customize link & accent color
- 🟡 (Potential) Auto Login with end to end encryption
- 🔴 Pin/bookmark pages/discussion posts
- 🔴 Email signatures
- 🔴 Add filters to search (Overdue/late assignments, certain classes, etc)
- 🔴 Show own discussion posts at the top of a discussion.
- 🔴 Sort discussions by likes and/or interaction
- 🔴 Access zoom links from extension popup
- 🔴 (Potential) Discussion signature
- 🔴 (Potential) Automatically export course content for offline viewing
- 🔴 Dashboard Overhaul
- 🔴 (Potential) Automatically or semiautomatically sync assignments with Notion, Trello, Clickup, Asana, etc.
- 🔴 Client-side links and link previews

If you want to add any of these, I'll accept your pull request!
If you have an idea of your own, I'll probably also merge it, but you might want to check with me. You can contact me (<a href="https://github.com/adrWasTaken">more details on my github profile</a>), or make an issue in this repo, and I'll let you know what I think!

<br><br>
# 🖥️  Develop

I'm happy to collaborate on this and any pull request will be accepted if they improve the extension. *All extensions are coded in JavaScript* and google has some great resources to learn more about developing chrome extensions. For now, here's a rundown of what everything does and some useful functions:

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
