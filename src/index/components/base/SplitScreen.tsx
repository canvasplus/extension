import Sidebar from "./Sidebar";

export default function SplitScreen(props) {
  return (
    <div className="fixed top-0 left-0 h-full w-full flex flex-row">
      <Sidebar />
      {/*<iframe src="https://www.google.com" className="h-full w-full "></iframe> */}
      {/* <div className="h-full bg-red-100"></div> */}
    </div>
  );
}
