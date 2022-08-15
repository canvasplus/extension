import { createEffect, createSignal } from "solid-js";
import { useLocation } from "../../../lib/context/location";
import { useSidebarContent } from "../../../lib/context/sidebarContent";
import { Module } from "../../../lib/types/Module";
import SidebarToggle from "../SidebarToggle";

function ModuleContainerItem(props: { module: Module; courseId: number }) {
  const [{ getCurrentLocation }] = useLocation();

  const onModule = () =>
    new URL(getCurrentLocation()).searchParams.get("module_item_id") != null;

  const { module } = props;

  const expandedSignal = createSignal(false);

  const [expanded, setExpanded] = expandedSignal;

  const { setBottom } = useSidebarContent();

  createEffect(() => {
    if (expanded()) {
      setBottom(
        <div
          onClick={() => {
            setExpanded(false);
          }}
        >
          Click me to Close
        </div>
      );
    } else {
      setBottom(undefined);
    }
  });

  return (
    <SidebarToggle
      title={module.name}
      href={`${new URL(getCurrentLocation()).origin}/courses/${
        props.courseId
      }/modules/${module.id}`}
      indent={2}
      primaryFunction="TOGGLE"
      expandedSignal={expandedSignal}
      highlighted={false}
    />
  );
}

export default ModuleContainerItem;
