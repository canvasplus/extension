import { createEffect, createSignal } from "solid-js";
import { useLocation } from "../../../lib/context/location";
import { useSidebarContent } from "../../../lib/context/sidebarContent";
import { Module } from "../../../lib/types/Module";
import ModulesContainer from "../modules/ModulesContainer";
import SidebarToggle from "../SidebarToggle";

function AllModulesContainerItem(props: {
  modules: Module[];
  courseId: number;
}) {
  const [{ getCurrentLocation }] = useLocation();

  const onModule = () =>
    new URL(getCurrentLocation()).searchParams.get("module_item_id") != null;

  const { modules } = props;

  const expandedSignal = createSignal(false);

  const [expanded, setExpanded] = expandedSignal;

  const { setBottom } = useSidebarContent();

  createEffect(() => {
    if (expanded()) {
      setBottom(
        <ModulesContainer
          modules={modules}
          courseId={props.courseId}
          close={() => {
            setExpanded(false);
          }}
        />
      );
    } else {
      setBottom(undefined);
    }
  });

  return (
    <SidebarToggle
      title={"View All"}
      indent={2}
      primaryFunction="TOGGLE"
      expandedSignal={expandedSignal}
      highlighted={false}
    />
  );
}

export default AllModulesContainerItem;
