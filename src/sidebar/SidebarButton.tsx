import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { TransitionStyles } from "../util/TransitionStyles";

export default function SidebarButton(props: {
  active: boolean;
  icon: React.ReactElement;
  onClick?: () => void;
  children?: React.ReactNode;
  childrenType?: "tooltip" | "menu";
}) {
  const [showPopout, setShowPopout] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (props.childrenType === "menu") {
      if (hover) {
        setShowPopout(true);
      } else {
        const timeout = setTimeout(() => {
          setShowPopout(false);
        }, 400);

        return () => {
          clearTimeout(timeout);
        };
      }
    } else {
      setShowPopout(hover);
    }
  }, [hover]);

  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const tooltipStyles: TransitionStyles = {
    entering: {
      opacity: 0,
      "--tw-scale-x": 0.5,
      "--tw-scale-y": 0.5,
    } as React.CSSProperties,
    entered: {
      transitionProperty: "transform, opacity",
    },
    exiting: {
      transitionProperty: "transform, opacity",
      "--tw-scale-x": 0.5,
      "--tw-scale-y": 0.5,
      opacity: 0,
    } as React.CSSProperties,
    exited: {},
    unmounted: {},
  };
  return (
    <button
      onClick={props.onClick}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative"
    >
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-lg active:scale-90 ${
          props.active
            ? "bg-rose-600 transition-all"
            : "hover:bg-rose-600/50 transition-transform"
        }`}
      >
        <div
          className={`text-xl ${props.active ? "text-white" : "text-rose-300"}`}
        >
          {props.icon}
        </div>
      </div>
      <Transition
        nodeRef={tooltipRef}
        in={showPopout}
        timeout={props.childrenType === "menu" ? 75 : 500}
        unmountOnExit={true}
      >
        {(state) =>
          props.childrenType === "menu" ? (
            <div
              className={`absolute top-0 left-full transform duration-150 transition-none flex items-start z-50 ${
                props.childrenType === "menu"
                  ? "origin-top-left"
                  : "origin-left"
              }`}
              ref={tooltipRef}
              style={tooltipStyles[state]}
            >
              <div className="w-1 h-2 pt-1.5">
                <div className="border-solid border-r-rose-100 border-r-4 border-y-transparent border-y-4 border-l-0" />
              </div>
              <div>
                <div className="bg-rose-100 text-rose-500 rounded-md ">
                  {props.children}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`absolute top-1/2 -translate-y-1/2 left-full transform duration-150 transition-none origin-left flex items-center z-50`}
              ref={tooltipRef}
              style={tooltipStyles[state]}
            >
              <div className="w-1 h-2">
                <div className="border-solid border-r-rose-100 border-r-4 border-y-transparent border-y-4 border-l-0" />
              </div>
              <div className="my-2 text-sm">
                <div className="bg-rose-100 text-rose-500 rounded-md py-1 px-2">
                  {props.children}
                </div>
              </div>
            </div>
          )
        }
      </Transition>
    </button>
  );
}
