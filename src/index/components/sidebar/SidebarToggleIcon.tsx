import {
  IoBookOutline,
  IoCaretForward,
  IoGridOutline,
  IoHomeOutline,
  IoNewspaperOutline,
} from "solid-icons/io";
import { Accessor, Signal } from "solid-js";

export default function SidebarToggleIcon(props: {
  expandedSignal: Signal<boolean>;
  highlighted: boolean;
}) {
  const [expanded, setExpanded] = props.expandedSignal;

  return (
    <div
      className="p-1.5 group-2 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setExpanded(!expanded());
      }}
    >
      <div className="p-1 rounded-md group-2-hover:bg-cyan-300">
        <div
          className={`transition-transform flex justify-center items-center w-4 h-4 relative ${
            expanded() ? "rotate-90" : "rotate-0"
          }`}
        >
          <IoCaretForward className="text-sm" />
        </div>
      </div>
    </div>
  );
}
