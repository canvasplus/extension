import { IoCaretForward } from "solid-icons/io";
import { Accessor } from "solid-js";

export default function SidebarToggleIcon(props: {
  type: "DEFAULT" | "MODULES";
  expanded: Accessor<boolean>;
}) {
  if (props.type === "DEFAULT" || true) {
    return (
      <div
        className={`transition-transform block w-fit ${
          props.expanded() ? "rotate-90" : "rotate-0"
        }`}
      >
        <IoCaretForward className="text-sm" />
      </div>
    );
  } else {
  }
}
