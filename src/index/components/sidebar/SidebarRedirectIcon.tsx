import {
  IoArrowRedo,
  IoArrowRedoOutline,
  IoCaretForward,
} from "solid-icons/io";
import { Accessor } from "solid-js";

export default function SidebarRedirectIcon(props: {
  type: "DEFAULT" | "EXTERNAL";
}) {
  if (props.type === "DEFAULT") {
    return (
      <div className="block w-fit">
        <IoArrowRedo className="text-sm" />
      </div>
    );
  } else {
    return (
      <div className="block w-fit">
        <IoArrowRedoOutline className="text-sm" />
      </div>
    );
  }
}
