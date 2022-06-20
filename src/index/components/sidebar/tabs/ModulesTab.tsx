import { useLocation } from "../../../lib/context/location";
import Loading from "../../util/Loading";
import SidebarToggle from "../SidebarToggle";
import TabComponentProps from "./TabComponentProps";

export default function ModulesTab(props: TabComponentProps) {
  const [{ getCurrentLocation }] = useLocation();

  const onModule = () =>
    new URL(getCurrentLocation()).searchParams.get("module_item_id") != null;

  return (
    <SidebarToggle
      indent={1}
      title={props.tab.label}
      href={props.tab.full_url}
      highlighted={
        props.parentHighlighted() &&
        (props.path()[2] === "modules" || onModule())
      }
      iconType={"MODULES"}
    >
      <Loading />
    </SidebarToggle>
  );
}
