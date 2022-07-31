import { useSidebar } from "../../lib/context/sidebar";
import Sidebar from "../sidebar/Sidebar";

export default function SplitScreen(props) {
  return (
    <div className="h-full w-full flex flex-row">
      {useSidebar()}
      <div className="pl-80 w-full h-full">{props.children}</div>
    </div>
  );
}
