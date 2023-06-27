import React, { useRef } from "react";
import { Transition } from "react-transition-group";
import { TransitionStyles } from "../util/TransitionStyles";

export default function SidebarDrawer(props: { show: boolean }) {
  const nodeRef = useRef(null);

  const transitionStyles: TransitionStyles = {
    entering: {
      opacity: 0.5,
      "--tw-translate-x": "-100%",
      transitionProperty: "none",
    } as React.CSSProperties,
    entered: {
      "--tw-translate-x": "0%",
      transitionProperty: "all",
    } as React.CSSProperties,
    exiting: {
      "--tw-translate-x": "-100%",
      transitionProperty: "all",
      opacity: 0.5,
    } as React.CSSProperties,
    exited: {
      display: "none",
    },
  };

  return (
    <Transition
      nodeRef={nodeRef}
      in={props.show}
      timeout={{
        enter: 0,
        exit: 300,
      }}
    >
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...transitionStyles[state],
          }}
          className="bg-rose-50 w-60 h-full shadow-lg p-2 transform duration-300"
        ></div>
      )}
    </Transition>
  );
}
