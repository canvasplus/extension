import { useProgress } from "../../lib/context/progress";
import { useSidebar } from "../../lib/context/sidebar";
import Sidebar from "../sidebar/Sidebar";

export default function SplitScreen(props) {
  const [start, stop, progress] = useProgress();

  return (
    <div className="h-full w-full flex flex-row">
      {useSidebar()}
      <div
        className={`pl-80 w-full h-full ${
          progress() === "RESTING" ? "animate-fade-in" : "hidden"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}
