import { CourseTab } from "../../lib/types/CourseTab";
import Loading from "../util/Loading";
import SidebarRedirectIcon from "./SidebarRedirectIcon";
import SidebarRedirect from "./SidebarRedirect";

export default function TabOnSidebar(props: {
  tab: CourseTab;
  courseId: number;
}) {
  return (
    <SidebarRedirect indent={1} title={props.tab.label}>
      <SidebarRedirectIcon type="DEFAULT" />
    </SidebarRedirect>
  );
  // if (props.tab.type === "internal") {
  //   return <SidebarRedirectIcon type="DEFAULT" />;
  // } else {
  //   return <SidebarRedirectIcon type="EXTERNAL" />;
  // }
}
