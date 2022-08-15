import { createSignal } from "solid-js";
import { useSidebarContent } from "../../lib/context/sidebarContent";
import { getCourses } from "../../lib/courseData";
import { Course } from "../../lib/types/Course";
import CourseOnSidebar from "./CourseOnSidebar";

function SidebarBottomDefault() {
  const [courses, setCourses] = createSignal<Course[] | undefined>(undefined);

  getCourses().then(setCourses);

  return (
    <div className="p-1">
      {courses()?.map((c) => (
        <CourseOnSidebar course={c} />
      ))}
    </div>
  );
}

function SidebarBottom() {
  const { bottom } = useSidebarContent();

  return <>{bottom() || <SidebarBottomDefault />}</>;
}

export default SidebarBottom;
