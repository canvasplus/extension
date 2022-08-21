import { IoOpenOutline, IoGlobeOutline } from "solid-icons/io";
import { FiExternalLink } from "solid-icons/fi";
import { children, createSignal, JSX, Show, Signal } from "solid-js";
import { useLocation } from "../../lib/context/location";
import Loading from "../util/Loading";
import VLink from "../util/VLink";
import SidebarItem from "./SidebarItem";
import SidebarToggleIcon from "./SidebarToggleIcon";

export default function SidebarToggle(props: {
  title: string;
  href?: string;
  children?: JSX.Element;
  highlighted: boolean;
  highlightedWithin?: boolean;
  primaryFunction: "TOGGLE" | "LINK";
  indent: 0 | 1 | 2 | 3 | 4;
  expandedSignal?: Signal<boolean>;
  loadingSignal?: Signal<boolean>;
  iconType?: string;
}) {
  const [{}, { goTo }] = useLocation();
  const expandedSignal = props.expandedSignal ?? createSignal(false);
  const loadingSignal = props.loadingSignal ?? createSignal(false);

  const [expanded, setExpanded] = expandedSignal;
  const [loading, setLoading] = loadingSignal;

  return (
    <div>
      <VLink href={props.href}>
        <div
          className={`rounded-lg group-1 ${
            props.highlighted ? "bg-cyan-200" : "hover:bg-cyan-200"
          }`}
          onClick={() => {
            if (props.primaryFunction === "LINK" && props.href != null) {
              goTo(props.href);
            } else {
              setExpanded(!expanded());
            }
          }}
        >
          <SidebarItem indent={props.indent}>
            <div
              className={`flex flex-row justify-between items-center w-full text-gray  ${
                props.highlighted ? "text-cyan-700" : "hover:text-cyan-700"
              }`}
            >
              <div className="flex flex-row items-center">
                <SidebarToggleIcon
                  expandedSignal={expandedSignal}
                  highlighted={props.highlighted}
                />

                <p className="pl-0.5 pr-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
                  {props.title}
                </p>
              </div>

              {/* @ts-ignore */}
              <Show when={loading()}>
                <div className="p-2.5">
                  <Loading size={16} />
                </div>
              </Show>

              {/* @ts-ignore */}
              <Show when={props.primaryFunction === "TOGGLE" && !loading()}>
                <div
                  className="p-1.5 group-2"
                  onClick={(e) => {
                    e.stopPropagation();

                    if (props.href) {
                      goTo(props.href);
                    }
                  }}
                >
                  <div className="p-[5px] group-2-hover:bg-cyan-300 rounded-md">
                    <FiExternalLink className="text-sm hidden group-1-hover:block" />
                  </div>
                </div>
                {props.highlightedWithin && (
                  <div className="w-2 h-2 mr-4 rounded-full group-1-hover:hidden bg-cyan-300" />
                )}
              </Show>

              {/* @ts-ignore */}
              <Show
                when={
                  props.primaryFunction !== "TOGGLE" &&
                  !loading() &&
                  props.highlightedWithin
                }
              >
                <div className="w-2 h-2 mr-4 rounded-full group-1-hover:bg-cyan-400 bg-cyan-300"></div>
              </Show>
            </div>
          </SidebarItem>
        </div>
      </VLink>
      <Show when={expanded()} children={props.children} />
    </div>
  );
}
