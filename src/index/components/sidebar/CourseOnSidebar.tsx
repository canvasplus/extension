import * as exp from "constants";
import { createSignal } from "solid-js";
import { useLocation } from "../../lib/context/location";
import { Course } from "../../lib/types/Course";
import Loading from "../util/Loading";
import SidebarToggle from "./SidebarToggle";
import TabOnSidebar from "./TabOnSidebar";

export default function CourseOnSidebar(props: { course: Course }) {
  const [{ getCurrentLocation }] = useLocation();

  const expandedSignal = createSignal(false);
  const [expanded, setExpanded] = expandedSignal;

  const path = () =>
    new URL(getCurrentLocation()).pathname.split("/").filter((n) => n);

  return (
    <SidebarToggle
      highlighted={
        path()[0] === "courses" && path()[1] === props.course.id.toString()
      }
      indent={0}
      title={props.course.name}
      expandedSignal={expandedSignal}
    >
      {props.course.tabs.map((tab) => {
        return <TabOnSidebar tab={tab} courseId={props.course.id} />;
      })}
    </SidebarToggle>
  );
}
