const placeholder = 0; /* default 14, Max 22(Without activating scroll bar) if seeting off then set to 0*/
const text = document.getElementsByClassName("menu-item__text");
const icon = document.getElementsByClassName("ic-icon-svg");
if (placeholder != 0) {
  for (i = 0; i < text.length; i++) {
      text[i].style.fontSize = placeholder + "px";
  };
  for (i = 0; i < icon.length; i++) {
    icon[i].style.width = placeholder * "1.85714285714" + "px";
  };
  document.getElementsByClassName("ic-app-header__logomark")[0].style.height = placeholder * "6.07142857143" + "px";
  document.getElementsByClassName("fs-exclude ic-avatar")[0].style.height = placeholder * "2.57142857143" + "px";
  document.getElementsByClassName("fs-exclude ic-avatar")[0].style.width = placeholder * "2.57142857143" + "px";
  document.getElementsByClassName("menu-item-icon-container")[0].style.width = placeholder * "2.57142857143" + "px";
};
const placeholder2 = false; /* default false */
if (placeholder2 == true) {
  document.getElementsByClassName("ic-app-header__logomark-container")[0].remove();
};
const placeholder3 = ;
if (placeholder3 != undefined) {
  document.getElementsByClassName("ic-app-header")[0].style.backgroundColor = "#" + placeholder3;
};
