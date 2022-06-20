import Loading from "../../util/Loading";
import SidebarToggle from "../SidebarToggle";
import TabComponentProps from "./TabComponentProps";

export default function HomeTab(props: TabComponentProps) {
  return (
    <SidebarToggle
      indent={1}
      title={props.tab.label}
      href={props.tab.full_url}
      highlighted={props.parentHighlighted()}
      iconType={"HOME"}
    >
      <Loading />
    </SidebarToggle>
  );
}
