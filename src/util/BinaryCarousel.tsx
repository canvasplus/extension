import React, { useRef } from "react";
import { Transition } from "react-transition-group";
import { TransitionStyles } from "./TransitionStyles";

export default function BinaryCarousel(props: {
  children: React.ReactElement[];
  index: 0 | 1;
}) {
  const leftRef = useRef<HTMLDivElement>(null);

  const leftStyles: TransitionStyles = {
    entering: {
      opacity: 0.5,
      "--tw-translate-x": "-100%",
      transitionProperty: "none",
    } as React.CSSProperties,
    entered: {
      transitionProperty: "all",
      opacity: 1,
    },
    exiting: {
      opacity: 0.5,
      "--tw-translate-x": "-100%",
      transitionProperty: "all",
    } as React.CSSProperties,
    exited: {
      display: "none",
    } as React.CSSProperties,
    unmounted: {},
  };

  const rightRef = useRef<HTMLDivElement>(null);

  const rightStyles: TransitionStyles = {
    entering: {
      opacity: 1,
      "--tw-translate-x": "-100%",
      transitionProperty: "all",
    } as React.CSSProperties,
    entered: {
      "--tw-translate-x": "0%",
      transitionProperty: "opacity",
      opacity: 1,
    } as React.CSSProperties,
    exiting: {
      "--tw-translate-x": "-100%",
      transitionProperty: "none",
    } as React.CSSProperties,
    exited: {
      opacity: 0.5,
      "--tw-translate-x": "0%",
      transitionProperty: "all",
    } as React.CSSProperties,
    unmounted: {},
  };

  return (
    <div className="flex overflow-hidden">
      <Transition
        in={props.index === 0}
        timeout={{
          enter: 0,
          exit: 300,
        }}
        nodeRef={leftRef}
      >
        {(state) => (
          <div
            ref={leftRef}
            className="transform duration-300 w-full shrink-0"
            style={leftStyles[state]}
          >
            {props.children[0]}
          </div>
        )}
      </Transition>

      <Transition
        in={props.index === 1}
        timeout={{
          enter: 300,
          exit: 0,
        }}
        nodeRef={rightRef}
      >
        {(state) => (
          <div
            ref={rightRef}
            className="transform duration-300 w-full shrink-0"
            style={rightStyles[state]}
          >
            {props.children[1]}
          </div>
        )}
      </Transition>
    </div>
  );
}
