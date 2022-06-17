import { Accessor, children } from "solid-js";

export default function Case(props) {
  return !!props.filter ? props.children : <></>;
}

export function NoCase(props: {
  redirect(to: string): void;
  route: Accessor<string>;
}) {
  const url = new URL(props.route());
  url.searchParams.set("view", "original-redirect");

  setTimeout(() => {
    props.redirect(url.toString());
  }, 1000);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col text-center gap-4">
        <h1 className="text-lg font-bold">Page Not Found</h1>
        <p>
          Canvas+ doesn't recognize this page. Redirecting you to normal Canvas.
        </p>
      </div>
    </div>
  );
}
