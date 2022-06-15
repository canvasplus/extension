import { children } from "solid-js";
import { NoCase } from "./Case";

export default function Router(props) {
  return (
    props.children.find((c) => !Array.isArray(c) || c.length > 0) ?? (
      <NoCase route={props.route} redirect={props.redirect} />
    )
  );
}
