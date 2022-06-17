import {
  children,
  createSignal,
  JSX,
  PropsWithChildren,
  Show,
  Signal,
} from "solid-js";
import { useLocation } from "../../lib/context/location";
import Loading from "../util/Loading";
import VLink from "../util/VLink";
import SidebarItem from "./SidebarItem";
import SidebarToggleIcon from "./SidebarToggleIcon";

export default function SidebarRedirect(props: {
  title: string;
  children?: JSX.Element;
  indent: 0 | 1 | 2 | 3 | 4;
  redirect: string;
}) {
  const [get, { goTo }] = useLocation();
  return (
    <VLink href={props.redirect}>
      <div
        className={`rounded-lg hover:bg-cyan-200 group`}
        onClick={(e) => {
          goTo(props.redirect);
        }}
      >
        <SidebarItem indent={props.indent}>
          <div
            className={`flex flex-row items-center w-full text-gray group-hover:text-cyan-700 overflow-hidden`}
          >
            <div className="p-2.5 rounded-md">{props.children}</div>
            <p className="pl-0.5 pr-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
              {props.title}
            </p>
          </div>
        </SidebarItem>
      </div>
    </VLink>
  );
}
