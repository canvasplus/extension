import { CourseTab } from "../../lib/types/CourseTab";
import Loading from "../util/Loading";
import SidebarRedirectIcon from "./SidebarRedirectIcon";
import SidebarRedirect from "./SidebarRedirect";
import SidebarToggleIcon from "./SidebarToggleIcon";
import SidebarToggle from "./SidebarToggle";
import { useLocation } from "../../lib/context/location";
import HomeTab from "./tabs/HomeTab";
import PagesTab from "./tabs/PagesTab";
import ModulesTab from "./tabs/ModulesTab";

export default function TabOnSidebar(props: {
  tab: CourseTab;
  courseId: number;
}) {
  const [{ getCurrentLocation }] = useLocation();

  const { type, id } = props.tab;

  const path = () =>
    new URL(getCurrentLocation()).pathname.split("/").filter((n) => n);

  const highlighted = () =>
    path()[0] === "courses" && path()[1] === props.courseId.toString();

  if (type === "external") {
    return (
      <SidebarRedirect
        indent={1}
        title={props.tab.label}
        redirect={props.tab.full_url}
      >
        <SidebarRedirectIcon type={"EXTERNAL"} />
      </SidebarRedirect>
    );
  } else if (id === "home") {
    return (
      <HomeTab
        courseId={props.courseId}
        parentHighlighted={highlighted}
        path={path}
        tab={props.tab}
      />
    );
  } else if (id === "pages") {
    return (
      <PagesTab
        courseId={props.courseId}
        parentHighlighted={highlighted}
        path={path}
        tab={props.tab}
      />
    );
  } else if (id === "modules") {
    return (
      <ModulesTab
        courseId={props.courseId}
        parentHighlighted={highlighted}
        path={path}
        tab={props.tab}
      />
    );
  } else {
    return (
      <SidebarRedirect
        indent={1}
        title={props.tab.label}
        redirect={props.tab.full_url}
      >
        <SidebarRedirectIcon type={"DEFAULT"} />
      </SidebarRedirect>
    );
  }
  // const icon = (): { icon: string; type: "REDIRECT" | "TOGGLE" } => {
  //   if (props.tab.type === "external")
  //     return { icon: "EXTERNAL", type: "REDIRECT" };
  //   else {
  //     if (props.tab.id === "home") return { icon: "HOME", type: "TOGGLE" };
  //     return { icon: "DEFAULT", type: "REDIRECT" };
  //   }
  // };
  // if (icon().type === "REDIRECT") {
  //   return (
  //     <SidebarRedirect
  //       indent={1}
  //       title={props.tab.label}
  //       redirect={props.tab.full_url}
  //     >
  //       {/* @ts-ignore */}
  //       <SidebarRedirectIcon type={icon().icon} />
  //     </SidebarRedirect>
  //   );
  // } else {
  //   return (
  //     <SidebarToggle
  //       indent={1}
  //       title={props.tab.label}
  //       redirect={props.tab.full_url}
  //     >
  //     </SidebarRedirect>
  //   );
  // }
  // // if (props.tab.type === "internal") {
  // //   return <SidebarRedirectIcon type="DEFAULT" />;
  // // } else {
  // //   return <SidebarRedirectIcon type="EXTERNAL" />;
  // // }
}
