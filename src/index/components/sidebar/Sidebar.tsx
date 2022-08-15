import { createSignal } from "solid-js";
import { SidebarContentProvider } from "../../lib/context/sidebarContent";
import { getCourses } from "../../lib/courseData";
import { Course } from "../../lib/types/Course";
import CourseOnSidebar from "./CourseOnSidebar";
import SidebarBottom from "./SidebarBottom";
import SidebarItem from "./SidebarItem";
import SidebarToggle from "./SidebarToggle";
import SidebarToggleIcon from "./SidebarToggleIcon";
import SidebarTop from "./top/SidebarTop";

function SidebarInner(props) {
  return (
    <div className="fixed w-80 bg-cyan-50 h-full text-sm overflow-scroll">
      <SidebarTop />
      <SidebarBottom />
    </div>
  );
}

const Sidebar = () => (
  <SidebarContentProvider>
    <SidebarInner />
  </SidebarContentProvider>
);

export default Sidebar;
