import { IoContrast } from "solid-icons/io";
import { createEffect, createSignal } from "solid-js";
import Dialogue from "../../../../interactive/containers/Dialogue";
import { ContentToolbarButtonProps } from "../ContentMetaToolbar";
import ContentTopButton from "../ContentTopButton";

function ToggleDarkModeButton(props: ContentToolbarButtonProps) {
  const [active, setActive] = createSignal(false);

  let ref;

  createEffect((listener) => {
    if (listener) {
      window.removeEventListener("click", listener as () => any);
    }

    if (active()) {
      const callback = (e) => {
        if (!e.path.includes(ref)) {
          setActive(false);
        }
      };

      window.addEventListener("click", callback);

      return callback;
    }
  });
  return (
    <div className="relative" ref={ref}>
      <ContentTopButton
        active={active}
        tooltip="Toggle Dark Mode"
        removingSignal={props.removingSignal}
        onClick={() => {
          setActive(!active());
        }}
        dragSignal={props.dragSignal}
      >
        <IoContrast />
      </ContentTopButton>
      {active() && (
        <div className="absolute top-9">
          <Dialogue>
            <p>Dialogue</p>
          </Dialogue>
        </div>
      )}
    </div>
  );
}

export default ToggleDarkModeButton;
