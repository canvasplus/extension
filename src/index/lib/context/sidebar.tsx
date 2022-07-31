import { createSignal, createContext, useContext, JSX } from "solid-js";

const SidebarContext = createContext<JSX.Element>();

export function SidebarProvider(props: {
  sidebar: JSX.Element;
  children?: JSX.Element;
}) {
  const [sidebar] = createSignal<JSX.Element>(props.sidebar);

  return <SidebarContext.Provider value={sidebar} children={props.children} />;
}

export function useSidebar() {
  return useContext(SidebarContext);
}
