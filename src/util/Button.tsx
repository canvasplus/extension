import React from "react";

export default function Button(props: {
  children: React.ReactNode[] | React.ReactNode;
  onClick?: () => void;
  type: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
}) {
  const styleMap = {
    primary: "bg-rose-500 text-white border-rose-600",
    secondary: "bg-white text-gray-400 border-gray-200",
  };

  const sizeMap = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
  };

  if (props.href)
    return (
      <a href={props.href} onClick={props.onClick} className="no-underline">
        <Button type={props.type} size={props.size}>
          {props.children}
        </Button>
      </a>
    );
  return (
    <button
      onClick={props.onClick}
      className={`rounded-md ${styleMap[props.type]} ${
        sizeMap[props.size || "md"]
      } flex gap-2 shadow-sm border active:translate-y-1 transition-transform duration-150 items-center`}
    >
      {props.children}
    </button>
  );
}
