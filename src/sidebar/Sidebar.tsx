import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import { FiBook, FiSearch } from "react-icons/fi";
import SidebarDrawer from "./SidebarDrawer";

export default function Sidebar() {
  const [show, __setShow] = useState(false);

  const [screen, __setScreen] = useState<string | undefined>(undefined);

  function setScreen(newScreen?: string) {
    if (newScreen == null) {
      __setShow(false);
      __setScreen(undefined);
    } else if (screen === newScreen) {
      __setShow(false);
      __setScreen(undefined);
    } else if (screen == null) {
      __setShow(true);
      __setScreen(newScreen);
    } else {
      __setShow(false);
      setTimeout(() => {
        __setShow(true);
        __setScreen(newScreen);
      }, 150);
    }
  }

  return (
    <div className="box-border fixed top-0 left-0 h-full flex flex-row z-50">
      <div className="w-14 h-full bg-rose-500 p-2 z-50">
        <SidebarButton
          active={screen === "book"}
          icon={<FiBook />}
          onClick={() => setScreen("book")}
        />
        <SidebarButton
          active={screen === "search"}
          icon={<FiSearch />}
          onClick={() => setScreen("search")}
        />
      </div>
      <SidebarDrawer show={show} />
    </div>
  );
}
