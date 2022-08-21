import { FiExternalLink } from "solid-icons/fi";
import { IoTextOutline } from "solid-icons/io";
import { children, createSignal, JSX, Show, Signal } from "solid-js";
import { useLocation } from "../../lib/context/location";
import Loading from "../util/Loading";
import VLink from "../util/VLink";
import SidebarItem from "./SidebarItem";
import SidebarToggleIcon from "./SidebarToggleIcon";

export default function SidebarHeader(props: {
  title: string;
  indent: 0 | 1 | 2 | 3 | 4;
}) {
  return (
    <div className={`group-1`}>
      <SidebarItem indent={props.indent}>
        <div
          className={`flex flex-row justify-between items-center w-full text-gray`}
        >
          <div className="flex flex-row items-center">
            <div className="p-2.5 group-2">
              <div
                className={`flex justify-center items-center w-4 h-4 relative`}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M96.4 416h77.1l50.9-96.6V96h-160v223.4h77.1L96.4 416zm224 0h77.1l50-96.6V96H288.4v223.4h82l-50 96.6z"></path>
                </svg>
              </div>
            </div>

            <p className="pl-0.5 pr-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
              {props.title}
            </p>
          </div>
        </div>
      </SidebarItem>
    </div>
  );
}
