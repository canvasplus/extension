chrome.storage.local.get(["canvasplus-setting-linkcolor"], (data) => {
  const color = data["canvasplus-setting-linkcolor"];

  if(color.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)) {
    var link = document.createElement("link");
    link.href = chrome.extension.getURL("src/inject/linkcolor/linkcolor.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName('html')[0].appendChild(link);
    document.documentElement.style.setProperty('--cp-link-color', color);
    document.documentElement.style.setProperty('--cp-link-color-lightened-10', shadeColor(color,10));
    document.documentElement.style.setProperty('--cp-link-color-darkened-10', shadeColor(color,-10));
  };
});

const shadeColor = (color, inc) => {// from https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  if( color.length === 4 ) {
    color = "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]; 
  }

  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);

  R = parseInt(R  + inc);
  G = parseInt(G  + inc);
  B = parseInt(B  + inc);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}
