import React from "react";

export default function SidebarButton(props: { icon: React.ReactElement }) {
  return (
    <div className="bg-rose-600 w-12 h-12 flex items-center justify-center rounded-lg">
      <div className="text-white text-2xl">{props.icon}</div>
    </div>
  );
}
