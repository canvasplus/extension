import { createEffect, JSX } from "solid-js";
import {
  DARK_BACKGROUND_RGB,
  getLuminance,
  improveContrast,
  LIGHT_BACKGROUND_RGB,
  RECCOMENDED_READING_CONTRAST,
  RGBArray,
} from "../../lib/color";
import { rgb, hex } from "color-convert";
import parse from "color-parse";
import { useDarkMode } from "../../lib/context/darkMode";

function ColorGuard(props: { children?: JSX.Element }) {
  let body: HTMLElement;

  const [darkMode] = useDarkMode();

  function correctElementColor(element: HTMLElement) {
    const style = window.getComputedStyle(element);

    const backgroundColor = style.getPropertyValue("background-color");

    if (backgroundColor !== "rgba(0, 0, 0, 0)") {
      const color = parse(backgroundColor);
      if (color.space === "rgb") {
        const lightBackground = getLuminance(color.values) > 127;

        if (lightBackground) {
          element.style.color = "black";
        } else {
          element.style.color = "white";
        }

        element.querySelectorAll("*").forEach((e) => {
          if (e.nodeType === 1) {
            (e as HTMLElement).dataset["parent_background"] = lightBackground
              ? "light"
              : "dark";
          }
        });
      }
    } else if (element.dataset["parent_background_color"]) {
      if (element.dataset["parent_background_color"] === "light") {
        element.style.color = "black";
      } else {
        element.style.color = "white";
      }
    } else {
      const color = parse(style.color);

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
  }

  const observerCallback = function (mutationList: MutationRecord[], observer) {
    mutationList.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const element = node as HTMLElement;

            correctElementColor(element);

            element.querySelectorAll("*").forEach((child) => {
              if (child.nodeType === 1) {
                correctElementColor(child as HTMLElement);
              }
            });
          }
        });
      }

      if (mutation.type === "attributes") {
        if (mutation.target.nodeType === 1) {
          const element = mutation.target as HTMLElement;

          correctElementColor(element);

          element.querySelectorAll("*").forEach((child) => {
            if (child.nodeType === 1) {
              correctElementColor(child as HTMLElement);
            }
          });
        }
      }
    });
  };

  function correctColors() {
    body.querySelectorAll("*").forEach((element) => {
      if (element.nodeType === 1) {
        correctElementColor(element as HTMLElement);
      }
    });
  }

  createEffect((oldObserver?: MutationObserver) => {
    if (oldObserver) oldObserver.disconnect();

    correctColors();

    const observer = new MutationObserver(observerCallback);

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
