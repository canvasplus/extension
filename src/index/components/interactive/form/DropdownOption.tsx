import { JSX } from "solid-js";

function DropdownOption(props: {
  select(): void;
  selected: boolean;
  label: string;
  children?: JSX.Element;
}) {
  return (
    <div className="flex flex-row w-full py-1.5 px-3 items-center gap-3 text-light-sys-icon dark:text-dark-sys-icon hover:bg-light-sys-btn-bg dark:hover:bg-dark-sys-btn-bg">
      {props.children}
      <p className="text-light-sys-par dark:text-dark-sys-par">{props.label}</p>
    </div>
  );
}

export default DropdownOption;
