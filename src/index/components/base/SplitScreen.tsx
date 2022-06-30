import Sidebar from "../sidebar/Sidebar";

export default function SplitScreen(props) {
  return (
    <div className="h-full w-full flex flex-row">
      <Sidebar />
      <div className="pl-80">{props.children}</div>
    </div>
  );
}
