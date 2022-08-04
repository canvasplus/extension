import { IoRocketOutline } from "solid-icons/io";
import { useLocation } from "../../../lib/context/location";
import SidebarTopItem from "./SidebarTopItem";

function SidebarTop() {
  const [{ getCurrentLocation }, { goToPath }] = useLocation();

  function handleDashboardClick() {
    console.log("handling dashboard click");

    goToPath("/");
  }

  return (
    <div className="w-full border-b-2 border-b-cyan-200 p-1">
      <SidebarTopItem
        title="Dashboard"
        onClick={handleDashboardClick}
        highlighted={getCurrentLocation() === "/"}
        link="/"
      >
        <IoRocketOutline />
      </SidebarTopItem>
    </div>
  );
}

export default SidebarTop;
