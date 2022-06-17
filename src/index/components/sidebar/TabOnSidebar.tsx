import { CourseTab } from "../../lib/types/CourseTab";
import Loading from "../util/Loading";
import SidebarRedirectIcon from "./SidebarRedirectIcon";
import SidebarRedirect from "./SidebarRedirect";

export default function TabOnSidebar(props: {
  tab: CourseTab;
  courseId: number;
}) {
  const iconType = () => {
    if (props.tab.type === "external") return "EXTERNAL";
    else return "DEFAULT";
  };

  return (
    <SidebarRedirect
      indent={1}
      title={props.tab.label}
      redirect={props.tab.full_url}
    >
      <SidebarRedirectIcon type={iconType()} />
    </SidebarRedirect>
  );
  // if (props.tab.type === "internal") {
  //   return <SidebarRedirectIcon type="DEFAULT" />;
  // } else {
  //   return <SidebarRedirectIcon type="EXTERNAL" />;
  // }
}
