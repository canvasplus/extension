import React from "react";

export default function SegmentedControl(props: {
  current: string;
  items: {
    name: string;
    value: string;
  }[];
  setItem: (itemValue: string) => void;
}) {
  return (
    <div
      className={`rounded-md bg-gray-100 text-sm flex items-stretch shadow-sm border border-gray-300 overflow-hidden`}
    >
      {props.items.map((item) => {
        return (
          <button
            className={`px-2 py-1 flex-1 ${
              item.value === props.current
                ? "bg-white text-gray-800"
                : "text-gray-400"
            }`}
            onClick={() => {
              props.setItem(item.value);
            }}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
}
