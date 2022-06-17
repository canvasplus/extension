import { children, createSignal, JSX, Show, Signal } from "solid-js";
import Loading from "../util/Loading";
import SidebarItem from "./SidebarItem";
import SidebarToggleIcon from "./SidebarToggleIcon";

export default function SidebarRedirect(props: {
  title: string;
  children?: JSX.Element;
  indent: 0 | 1 | 2 | 3 | 4;
}) {
  return (
    <div>
      <div className={`rounded-lg hover:bg-cyan-200`}>
        <SidebarItem indent={props.indent}>
          <div
            className={`flex flex-row items-center w-full text-gray hover:text-cyan-700`}
          >
            <div className="p-2.5 rounded-md group-hover:bg-cyan-300">
              {props.children}
            </div>
            <p className="pl-0.5 pr-2">{props.title}</p>
          </div>
        </SidebarItem>
      </div>
    </div>
  );
}
