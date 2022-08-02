import { useProgress } from "../../lib/context/progress";
import SplitScreen from "./SplitScreen";

export default function DefaultView(props) {
  const progressBar = useProgress();
  const progessBarElement = progressBar[4];

  return (
    <div>
      {progessBarElement()}
      <SplitScreen>{props.children}</SplitScreen>;
    </div>
  );
}
