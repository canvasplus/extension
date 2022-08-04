import { JSX } from "solid-js";
import VLink from "../../util/VLink";

function SidebarTopItem(props: {
  title: string;
  onClick: () => void;
  children?: JSX.Element;
  highlighted: boolean;
  link?: string;
}) {
  if (props.link != null) {
    const newProps = { ...props, link: null };
    return (
      <VLink href={props.link}>
        <SidebarTopItem {...newProps} />
      </VLink>
    );
  }

  return (
    <div
      className={`group rounded-lg ${
        props.highlighted ? "bg-cyan-200" : "hover:bg-cyan-200"
      }`}
      onClick={props.onClick}
    >
      <div
        className={`flex flex-row items-center w-full ${
          props.highlighted
            ? "text-cyan-700"
            : "text-gray group-hover:text-cyan-700"
        } overflow-hidden`}
      >
        <div className="p-2.5">
          <div className="block w-4 h-4">{props.children}</div>
        </div>
        <p className="pl-0.5 pr-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
          {props.title}
        </p>
      </div>
    </div>
  );
}

export default SidebarTopItem;
