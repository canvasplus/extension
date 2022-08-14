import {
  createSignal,
  createContext,
  useContext,
  Accessor,
  Setter,
  Signal,
  JSX,
} from "solid-js";

const PreviousPageContext = createContext<{
  label?: string;
  icon?: JSX.Element;
}>();

export function PreviousPageProvider(props) {
  if (!props.label || !props.icon) return props.children;

  return (
    <PreviousPageContext.Provider
      value={{ label: props.label, icon: props.icon }}
      children={props.children}
    />
  );
}

export function usePreviousPage() {
  return useContext(PreviousPageContext);
}
