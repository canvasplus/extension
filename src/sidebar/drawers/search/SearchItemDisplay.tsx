import React from "react";

export default function SearchItemDisplay(props: {
  title: string;
  description: string;
  url: string;
  small: boolean;
  highlightIndex: number;
  index: number;
}) {
  return (
    <div
      className={`flex flex-col px-4 py-2 border-b border-b-gray-200 last:border-b-transparent ${
        props.highlightIndex === props.index
          ? "bg-rose-500 text-white"
          : "bg-white hover:bg-rose-50"
      }`}
    >
      <h3
        className={`${
          props.highlightIndex === props.index ? "text-white" : "text-black"
        }`}
      >
        {props.title}
      </h3>
      <p
        className={`${
          props.highlightIndex === props.index
            ? "text-gray-300"
            : "text-gray-400"
        } text-xs`}
      >
        {props.description}
      </p>
    </div>
  );
}
