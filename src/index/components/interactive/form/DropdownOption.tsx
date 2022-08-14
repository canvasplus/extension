import { JSX } from "solid-js";

function DropdownOption(props: {
  select(): void;
  selected: boolean;
  label: string;
  children?: JSX.Element;
}) {
  return (
    <div
      onClick={() => {
        props.select();
      }}
      className={`flex flex-row w-full py-1.5 px-3 items-center gap-3 hover:bg-light-sys-btn-bg dark:hover:bg-dark-sys-btn-bg cursor-pointer ${
        props.selected
          ? "text-cyan-600 dark:text-cyan-400"
          : "text-light-sys-icon dark:text-dark-sys-icon"
      }`}
    >
      {props.children}
      <p
        className={
          props.selected
            ? "text-cyan-600 dark:text-cyan-400"
            : "text-light-sys-par dark:text-dark-sys-par"
        }
      >
        {props.label}
      </p>
    </div>
  );
}

export default DropdownOption;
