import {
  createSignal,
  createContext,
  useContext,
  Accessor,
  Setter,
  Signal,
} from "solid-js";

type DarkModeMethod = "system" | "light" | "dark";

type Store = [
  Accessor<boolean>,
  Setter<boolean>,
  Accessor<DarkModeMethod>,
  Setter<DarkModeMethod>
];

const DarkModeContext = createContext<Store>();

export function DarkModeProvider(props) {
  const [enabled, setEnabled] = createSignal<boolean>(false);

  const [method, setMethod] = createSignal<DarkModeMethod>("light");

  return (
    <DarkModeContext.Provider
      value={[enabled, setEnabled, method, setMethod]}
      children={props.children}
    />
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
