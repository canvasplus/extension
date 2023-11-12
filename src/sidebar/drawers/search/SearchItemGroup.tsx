import React from "react";

export default function SearchItemGroup(props: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <h3>{props.label}</h3>

      <div className="flex rounded-md flex-col overflow-hidden">
        {props.children}
      </div>
    </div>
  );
}
