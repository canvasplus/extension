import {
  createSignal,
  createContext,
  useContext,
  Accessor,
  Setter,
  Signal,
} from "solid-js";

const DarkModeContext = createContext<Signal<boolean>>();

export function DarkModeProvider(props) {
  const signal = createSignal<boolean>(false);

  return <DarkModeContext.Provider value={signal} children={props.children} />;
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
