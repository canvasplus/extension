import { children, createSignal, JSX, Show, Signal } from "solid-js";
import Loading from "../util/Loading";
import SidebarItem from "./SidebarItem";
import SidebarToggleIcon from "./SidebarToggleIcon";

export default function SidebarToggle(props: {
  title: string;
  children?: JSX.Element;
  highlighted: boolean;
  indent: 0 | 1 | 2 | 3 | 4;
  expandedSignal?: Signal<boolean>;
}) {
  const [expanded, setExpanded] = props.expandedSignal ?? createSignal(false);

  return (
    <div>
      <div
        className={`rounded-lg ${
          props.highlighted ? "bg-cyan-200" : "hover:bg-cyan-200"
        }`}
      >
        <SidebarItem indent={props.indent}>
          <div
            className={`flex flex-row items-center w-full text-gray  ${
              props.highlighted ? "text-cyan-700" : "hover:text-cyan-700"
            }`}
          >
            <div
              className="p-1.5 group cursor-pointer"
              onClick={() => {
                setExpanded(!expanded());
              }}
            >
              <div className="p-1 rounded-md group-hover:bg-cyan-300">
                <SidebarToggleIcon expanded={expanded} type="DEFAULT" />
              </div>
            </div>
            <p className="pl-0.5 pr-2">{props.title}</p>
          </div>
        </SidebarItem>
      </div>
      <Show when={expanded()} children={props.children} />
    </div>
  );
}
