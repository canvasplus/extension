import Sidebar from "../sidebar/Sidebar";

export default function SplitScreen(props) {
  return (
    <div className="fixed top-0 left-0 h-full w-full flex flex-row">
      <Sidebar />
      {props.children}
    </div>
  );
}
