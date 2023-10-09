import React, { useRef } from "react";
import { Transition } from "react-transition-group";
import { TransitionStyles } from "../util/TransitionStyles";
import MailDrawer from "./drawers/mail/MailDrawer";
import CalendarDrawer from "./drawers/calendar/CalendarDrawer";
import TodoDrawer from "./drawers/todo/TasksDrawer";

export default function SidebarDrawer(props: {
  show: boolean;
  close: () => void;
  drawer?: string;
}) {
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
    unmounted: {},
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
          className="bg-rose-50 w-80 h-full shadow-lg transform duration-300"
        >
          {props.drawer === "tasks" && <TodoDrawer close={props.close} />}
          {props.drawer === "mail" && <MailDrawer close={props.close} />}
          {props.drawer === "calendar" && (
            <CalendarDrawer close={props.close} />
          )}
        </div>
      )}
    </Transition>
  );
}
