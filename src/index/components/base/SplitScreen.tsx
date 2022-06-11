import Sidebar from "./Sidebar";

export default function SplitScreen(props) {
  return (
    <div className="fixed top-0 left-0 h-full w-20">
      <Sidebar />
    </div>
  );
}
