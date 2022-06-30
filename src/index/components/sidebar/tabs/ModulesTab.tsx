import { createEffect, createSignal } from "solid-js";
import { useLocation } from "../../../lib/context/location";
import { getModules } from "../../../lib/modules";
import { Module } from "../../../lib/types/Module";
import Loading from "../../util/Loading";
import SidebarRedirect from "../SidebarRedirect";
import SidebarRedirectIcon from "../SidebarRedirectIcon";
import SidebarToggle from "../SidebarToggle";
import TabComponentProps from "./TabComponentProps";

export default function ModulesTab(props: TabComponentProps) {
  const [{ getCurrentLocation }] = useLocation();

  const onModule = () =>
    new URL(getCurrentLocation()).searchParams.get("module_item_id") != null;

  const [modules, setModules] = createSignal<undefined | Module[]>(undefined);

  const expandedSignal = createSignal(false);
  const [expanded] = expandedSignal;

  const loadingSignal = createSignal(false);
  const [loading, setLoading] = loadingSignal;

  createEffect(() => {
    if (expanded() && modules() == null) {
      setLoading(true);

      getModules(props.courseId).then((modules) => {
        setModules(modules);
        setLoading(false);
      });
    }
  });

  const inner = () => {
    const m = modules();

    if (m == null) {
      return <></>;
    } else if (m.length === 0) {
      return <div>No modules</div>;
    } else {
      return modules().map((module) => (
        <SidebarRedirect
          title={module.name}
          redirect={`${new URL(getCurrentLocation()).origin}/courses/${
            props.courseId
          }/modules/${module.id}`}
          indent={2}
        >
          <SidebarRedirectIcon type="DEFAULT" />
        </SidebarRedirect>
      ));
    }
  };

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
      primaryFunction={"TOGGLE"}
      expandedSignal={expandedSignal}
      loadingSignal={loadingSignal}
    >
      {inner()}
    </SidebarToggle>
  );
}
