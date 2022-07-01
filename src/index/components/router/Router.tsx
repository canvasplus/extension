import { children, createEffect, createSignal, createMemo } from "solid-js";
import { Accessor, ResolvedChildren } from "solid-js/types/reactive/signal";
import { useLocation } from "../../lib/context/location";
import { CaseDetails, NoCase } from "./Case";

export default function Router(props) {
  const [{ getCurrentLocation }, { goTo }] = useLocation();

  // @ts-ignore
  const cases: Accessor<CaseDetails[]> = children(() => props.children);

  const routePathname = () => {
    return new URL(getCurrentLocation()).pathname.replace(/\/+$/, "");
  };

  const path = () =>
    new URL(getCurrentLocation()).pathname.split("/").filter((n) => n);

  return (
    <div>
      {cases()
        .find((c) => c.filter(getCurrentLocation(), routePathname(), path()))
        ?.element() ?? <NoCase route={getCurrentLocation} redirect={goTo} />}
    </div>
  );
}
