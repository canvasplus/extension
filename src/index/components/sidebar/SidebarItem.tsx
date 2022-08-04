import { JSX } from "solid-js";

export default function SidebarItem(props: {
  children?: JSX.Element;
  indent: 0 | 1 | 2 | 3 | 4;
}) {
  const indent = () => {
    switch (props.indent) {
      case 4:
        return "w-16";
      case 3:
        return "w-12";
      case 2:
        return "w-8";
      case 1:
        return "w-4";
      case 0:
        return "w-0";
    }
  };

  return (
    <div className="flex flex-row w-full mb-0.5">
      <div className={`flex-shrink-0 ${indent()}`} />
      {props.children}
    </div>
  );
}
