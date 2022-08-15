import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Signal,
  Accessor,
  Setter,
} from "solid-js";

const SidebarContentContext = createContext<{
  bottom: Accessor<JSX.Element>;
  setBottom: Setter<JSX.Element>;
}>();

export function SidebarContentProvider(props: { children?: JSX.Element }) {
  const [bottom, setBottom] = createSignal<JSX.Element | undefined>(undefined);

  return (
    <SidebarContentContext.Provider
      value={{
        bottom,
        setBottom,
      }}
      children={props.children}
    />
  );
}

export function useSidebarContent() {
  return useContext(SidebarContentContext);
}
