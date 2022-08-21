import { createEffect, createSignal } from "solid-js";
import { useLocation } from "../../../lib/context/location";
import { useSidebarContent } from "../../../lib/context/sidebarContent";
import { getModules } from "../../../lib/modules";
import { Module } from "../../../lib/types/Module";
import Loading from "../../util/Loading";
import AllModulesContainerItem from "../items/AllModulesContainerItem";
import ModuleContainerItem from "../items/ModuleContainerItem";
import ModulesContainer from "../modules/ModulesContainer";
import SidebarRedirect from "../SidebarRedirect";
import SidebarRedirectIcon from "../SidebarRedirectIcon";
import SidebarToggle from "../SidebarToggle";
import SidebarToggleIcon from "../SidebarToggleIcon";
import TabComponentProps from "./TabComponentProps";

export default function ModulesTab(props: TabComponentProps) {
  const [{ getCurrentLocation }] = useLocation();

  const onModule = () =>
    new URL(getCurrentLocation()).searchParams.get("module_item_id") != null;

  const [modules, setModules] = createSignal<undefined | Module[]>(undefined);

  const expandedSignal = createSignal(false);
  const [expanded, setExpanded] = expandedSignal;

  const loadingSignal = createSignal(false);
  const [loading, setLoading] = loadingSignal;

  const { setBottom } = useSidebarContent();

  createEffect(() => {
    if (expanded() && modules() == null) {
      setLoading(true);

      getModules(props.courseId).then((modules) => {
        setModules(modules);
        setLoading(false);

        setBottom(
          <ModulesContainer
            modules={modules}
            courseId={props.courseId}
            close={() => {
              setExpanded(false);
            }}
          />
        );
      });
    }
  });

  createEffect(() => {
    if (expanded() && modules() != null) {
      setBottom(
        <ModulesContainer
          modules={modules() || []}
          courseId={props.courseId}
          close={() => {
            setExpanded(false);
          }}
        />
      );
    } else if (!expanded()) {
      setBottom(undefined);
    }
  });

  const inner = () => {
    const m = modules();

    if (m == null) {
      return <></>;
    } else if (m.length === 0) {
      return <div>No modules</div>;
    } else {
      return (
        <>
          <AllModulesContainerItem courseId={props.courseId} modules={m} />

          {m.map((module) => (
            <ModuleContainerItem module={module} courseId={props.courseId} />
          ))}
        </>
      );
    }
  };

  return (
    <SidebarToggle
      indent={1}
      title={props.tab.label}
      // href={props.tab.full_url}
      highlighted={
        props.parentHighlighted() &&
        props.path()[2] === "modules" &&
        props.path().length === 3
      }
      highlightedWithin={
        props.parentHighlighted() &&
        (props.path()[2] === "modules" || onModule())
      }
      iconType={"MODULES"}
      primaryFunction={"TOGGLE"}
      expandedSignal={expandedSignal}
      loadingSignal={loadingSignal}
    ></SidebarToggle>
  );
}
