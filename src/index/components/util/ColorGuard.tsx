import { createEffect, JSX } from "solid-js";
import {
  DARK_BACKGROUND_RGB,
  improveContrast,
  LIGHT_BACKGROUND_RGB,
  RECCOMENDED_READING_CONTRAST,
  RGBArray,
} from "../../lib/color";

import parse from "color-parse";
import { useDarkMode } from "../../lib/context/darkMode";

function ColorGuard(props: { children?: JSX.Element }) {
  let body;

  const [darkMode] = useDarkMode();

  function correctElementColor(element) {
    const color = parse(window.getComputedStyle(element).color);
    if (color.space === "rgb") {
      const improved = improveContrast(
        color.values,
        darkMode() ? DARK_BACKGROUND_RGB : LIGHT_BACKGROUND_RGB,
        RECCOMENDED_READING_CONTRAST
      );

      if (improved) {
        element.style.color = `rgb(${improved[0]} ${improved[1]} ${improved[2]})`;
      }
    }
  }

  const callback = function (mutationList: MutationRecord[], observer) {
    mutationList.forEach((mutation) => {
      console.log(mutation);

      mutation.type === "childList" &&
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const element = node as HTMLElement;

            correctElementColor(element);

            element.querySelectorAll("*").forEach((child) => {
              correctElementColor(child);
            });
          }
        });

      if (mutation.type === "attributes") {
        if (mutation.target.nodeType === 1) {
          const element = mutation.target as HTMLElement;

          correctElementColor(element);

          element.querySelectorAll("*").forEach((child) => {
            correctElementColor(child);
          });
        }
      }
    });
  };

  function correctColors() {
    body.querySelectorAll("*").forEach((element) => {
      correctElementColor(element);
    });
  }

  createEffect((oldObserver?: MutationObserver) => {
    if (oldObserver) oldObserver.disconnect();

    correctColors();

    const observer = new MutationObserver(callback);

    observer.observe(body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return observer;
  });

  return <div ref={body}>{props.children}</div>;
}

export default ColorGuard;
