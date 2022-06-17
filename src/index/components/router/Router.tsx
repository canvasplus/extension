import { children } from "solid-js";
import { useLocation } from "../../lib/context/location";
import { NoCase } from "./Case";

export default function Router(props) {
  const [{ getCurrentLocation }, { goTo }] = useLocation();
  return (
    props.children.find((c) => !Array.isArray(c) || c.length > 0) ?? (
      <NoCase route={getCurrentLocation} redirect={goTo} />
    )
  );
}
