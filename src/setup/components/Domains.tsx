import { render } from "solid-js/web";
import "../../global.css";
import { createSignal } from "solid-js";
import "tailwindcss/tailwind.css";
import { CanvasDomain } from "../../lib/CanvasDomain";

export const Domains: Function = (props: { next(): void }) => {
  const [domains, setDomains] = createSignal<CanvasDomain[]>([]);

  return <div>Domains</div>;
};
