import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function DayPicker(props: {
  onClickLeft: () => void;
  onClickRight: () => void;
  label: string;
}) {
  return (
    <div className="flex w-full justify-between h-12 border-y-2 border-b-rose-700/10">
      <div
        className="w-12 flex items-center justify-center hover:bg-rose-700/5 cursor-pointer flex-shrink-0 select-none"
        onClick={(e) => {
          props.onClickLeft();
          e.preventDefault();
        }}
      >
        <FiChevronLeft className="text-lg" />
      </div>

      <div className="w-full flex items-center justify-center select-none">
        <p>{props.label}</p>
      </div>

      <div
        className="w-12 flex items-center justify-center hover:bg-rose-700/5 cursor-pointer flex-shrink-0 select-none"
        onClick={(e) => {
          e.preventDefault();
          props.onClickRight();
        }}
      >
        <FiChevronRight className="text-lg" />
      </div>
    </div>
  );
}
