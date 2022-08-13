import { JSX } from "solid-js";

function Dialogue(props: { children?: JSX.Element }) {
  return (
    <div className="border border-slate-300 rounded-md">{props.children}</div>
  );
}

export default Dialogue;
