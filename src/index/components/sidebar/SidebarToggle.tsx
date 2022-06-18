import { IoOpenOutline } from "solid-icons/io";
import { children, createSignal, JSX, Show, Signal } from "solid-js";
import { useLocation } from "../../lib/context/location";
import Loading from "../util/Loading";
import VLink from "../util/VLink";
import SidebarItem from "./SidebarItem";
import SidebarToggleIcon from "./SidebarToggleIcon";

export default function SidebarToggle(props: {
  title: string;
  href: string;
  children?: JSX.Element;
  highlighted: boolean;
  indent: 0 | 1 | 2 | 3 | 4;
  expandedSignal?: Signal<boolean>;
  iconType?: string;
}) {
  const [{}, { goTo }] = useLocation();
  const [expanded, setExpanded] = props.expandedSignal ?? createSignal(false);

  return (
    <div>
      <VLink href={props.href}>
        <div
          className={`rounded-lg group-1 ${
            props.highlighted ? "bg-cyan-200" : "hover:bg-cyan-200"
          }`}
          onClick={() => {
            goTo(props.href);
          }}
        >
          <SidebarItem indent={props.indent}>
            <div
              className={`flex flex-row items-center w-full text-gray  ${
                props.highlighted ? "text-cyan-700" : "hover:text-cyan-700"
              }`}
            >
              <div
                className="p-1.5 group-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setExpanded(!expanded());
                }}
              >
                <div className="p-1 rounded-md group-2-hover:bg-cyan-300">
                  <SidebarToggleIcon
                    highlighted={props.highlighted}
                    expanded={expanded}
                    // @ts-ignore
                    type={props.iconType ?? "DEFAULT"}
                  />
                </div>
              </div>
              <p className="pl-0.5 pr-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
                {props.title}
              </p>
            </div>
          </SidebarItem>
        </div>
      </VLink>
      <Show when={expanded()} children={props.children} />
    </div>
  );
}
