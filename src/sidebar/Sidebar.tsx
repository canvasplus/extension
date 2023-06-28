import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import {
  FiBook,
  FiCalendar,
  FiMail,
  FiMoreHorizontal,
  FiSearch,
} from "react-icons/fi";
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
      <div className="w-14 h-full bg-rose-500 p-2 z-50 flex flex-col gap-1">
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
        <div className="mx-2">
          <div className="w-full h-0.5 my-2 bg-rose-900/30" />
        </div>
        <SidebarButton
          active={screen === "mail"}
          icon={<FiMail />}
          onClick={() => setScreen("mail")}
        />
        <SidebarButton
          active={screen === "calendar"}
          icon={<FiCalendar />}
          onClick={() => setScreen("calendar")}
        />
        <SidebarButton
          active={screen === "more"}
          icon={<FiMoreHorizontal />}
          onClick={() => setScreen("more")}
        />
      </div>
      <SidebarDrawer show={show} drawer={screen} />
    </div>
  );
}
