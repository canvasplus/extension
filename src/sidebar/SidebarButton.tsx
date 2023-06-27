import React from "react";

export default function SidebarButton(props: {
  active: boolean;
  icon: React.ReactElement;
  onClick?: () => void;
}) {
  return (
    <button onClick={props.onClick}>
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
    </button>
  );
}
