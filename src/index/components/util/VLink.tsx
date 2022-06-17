import { JSX } from "solid-js";

export default function VLink(props: {
  href?: string;
  children?: JSX.Element;
}) {
  if (!props.href) return props.children;

  return (
    <a
      href={props.href}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {props.children}
    </a>
  );
}
