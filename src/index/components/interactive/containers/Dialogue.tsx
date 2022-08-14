import { JSX } from "solid-js";

function Dialogue(props: { children?: JSX.Element; large?: boolean }) {
  return (
    <div
      className={`border border-light-sys-border dark:border-dark-sys-border bg-light-sys-bg dark:bg-dark-sys-bg rounded-md shadow-lg overflow-hidden ${
        props.large ? "w-48" : "w-32"
      }`}
    >
      {props.children}
    </div>
  );
}

export default Dialogue;
