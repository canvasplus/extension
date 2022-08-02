import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  Setter,
} from "solid-js";
import ProgressBar from "../../components/router/ProgressBar";

export type ProgressState = "RESTING" | "START_LOADING" | "LOADING";

type Store = [
  {
    (): void;
  },
  {
    (): void;
  },
  Accessor<ProgressState>,
  Setter<ProgressState>,
  Accessor<JSX.Element>
];

const ProgressContext = createContext<Store>();

export function ProgressProvider(props: { children?: JSX.Element }) {
  const [progress, setProgress] = createSignal<ProgressState>("RESTING");

  const [element] = createSignal<JSX.Element>(
    <ProgressBar progress={progress} setProgress={setProgress} />
  );

  function start() {
    setProgress("START_LOADING");
  }

  function done() {
    setProgress("RESTING");
  }

  const value: Store = [start, done, progress, setProgress, element];

  return <ProgressContext.Provider value={value} children={props.children} />;
}

export function useProgress() {
  return useContext(ProgressContext);
}
