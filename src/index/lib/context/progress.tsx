import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  Setter,
  createEffect,
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
  const [done, setDone] = createSignal(false);

  const [element] = createSignal<JSX.Element>(
    <ProgressBar progress={progress} setProgress={setProgress} />
  );

  createEffect(() => {
    if (progress() === "LOADING" && done()) {
      setProgress("RESTING");
      setDone(false);
    }
  });

  function start() {
    setProgress("START_LOADING");
  }

  function stop() {
    setDone(true);
  }

  const value: Store = [start, stop, progress, setProgress, element];

  return <ProgressContext.Provider value={value} children={props.children} />;
}

export function useProgress() {
  return useContext(ProgressContext);
}
