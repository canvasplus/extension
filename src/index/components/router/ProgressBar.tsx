import { Accessor, createEffect, createSignal, Setter } from "solid-js";
import { ProgressState } from "../../lib/context/progress";

export default function Progress(props: {
  progress: Accessor<ProgressState>;
  setProgress: Setter<ProgressState>;
}) {
  const [ready, setReady] = createSignal(false);

  let el;

  createEffect(() => {
    const progress = props.progress();

    if (
      progress === "START_LOADING" &&
      el.classList.contains("START_LOADING")
    ) {
      setTimeout(() => {
        props.setProgress("LOADING");
      }, 0);
    }
  });

  return (
    <div
      ref={el}
      className={`fixed top-0 left-0 h-[2.5px] z-50 PROGRESS_BAR ${props.progress()}`}
    ></div>
  );
}
