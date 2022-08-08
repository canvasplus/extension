import { createEffect, createSignal } from "solid-js";
import { useLocation } from "../../../lib/context/location";
import { getPages } from "../../../lib/pages";
import { Page } from "../../../lib/types/Page";
import Loading from "../../util/Loading";
import SidebarRedirect from "../SidebarRedirect";
import SidebarRedirectIcon from "../SidebarRedirectIcon";
import SidebarToggle from "../SidebarToggle";
import TabComponentProps from "./TabComponentProps";

export default function PagesTab(props: TabComponentProps) {
  const [{ getCurrentLocation }] = useLocation();

  const onModule = () =>
    new URL(getCurrentLocation()).searchParams.get("module_item_id") != null;

  const [pages, setPages] = createSignal<undefined | Page[]>(undefined);

  const expandedSignal = createSignal(false);
  const [expanded] = expandedSignal;

  const loadingSignal = createSignal(false);
  const [loading, setLoading] = loadingSignal;

  createEffect(() => {
    if (expanded() && pages() == null) {
      setLoading(true);

      getPages(props.courseId).then((pages) => {
        setPages(pages);
        setLoading(false);
      });
    }
  });

  const inner = () => {
    const p = pages();

    if (p == null) {
      return <></>;
    } else if (p.length === 0) {
      return <div>No pages</div>;
    } else {
      return pages().map((page) => (
        <SidebarRedirect
          title={page.title}
          redirect={`${new URL(getCurrentLocation()).origin}/courses/${
            props.courseId
          }/pages/${page.id}`}
          indent={2}
          highlighted={
            props.parentHighlighted() &&
            props.path()[2] === "pages" &&
            !onModule() &&
            props.path().length >= 4 &&
            (props.path()[3] === page.id ||
              props.path()[3] === page.numberId.toString())
          }
        >
          <SidebarRedirectIcon type="PAGE" />
        </SidebarRedirect>
      ));
    }
  };

  return (
    <SidebarToggle
      primaryFunction="TOGGLE"
      expandedSignal={expandedSignal}
      indent={1}
      title={props.tab.label}
      href={props.tab.full_url}
      highlighted={
        props.parentHighlighted() &&
        props.path()[2] === "pages" &&
        !onModule() &&
        props.path.length === 3
      }
      highlightedWithin={
        props.parentHighlighted() && props.path()[2] === "pages" && !onModule()
      }
      iconType={"PAGES"}
      loadingSignal={loadingSignal}
    >
      {inner()}
    </SidebarToggle>
  );
}
