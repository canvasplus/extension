import { JSX } from "solid-js";

function Dialogue(props: { children?: JSX.Element }) {
  return (
    <div className="border border-light-sys-border dark:border-dark-sys-border bg-light-sys-bg dark:bg-dark-sys-bg rounded-md shadow-lg w-32 py-1">
      {props.children}
    </div>
  );
}

export default Dialogue;
