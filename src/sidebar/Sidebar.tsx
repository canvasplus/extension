import React from "react";
import SidebarButton from "./SidebarButton";
import { FiBook, FiSearch } from "react-icons/fi";

export default function Sidebar() {
  return (
    <div className="box-border fixed top-0 left-0 h-full flex flex-col z-50">
      <div className="w-16 h-full bg-rose-500 p-2">
        <SidebarButton icon={<FiBook />} />
        <SidebarButton icon={<FiSearch />} />
      </div>
    </div>
  );
}
