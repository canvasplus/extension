import { FiMonitor, FiMoon, FiSun } from "solid-icons/fi";
import {
  IoContrast,
  IoDesktopOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "solid-icons/io";
import { createEffect, createSignal } from "solid-js";
import Dialogue from "../../../../interactive/containers/Dialogue";
import DropdownOption from "../../../../interactive/form/DropdownOption";
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
        <div className="absolute top-10 right-0 animate-slide-sm-down">
          <Dialogue>
            <DropdownOption label="Light" select={() => {}} selected={false}>
              <FiSun />
            </DropdownOption>

            <DropdownOption label="Dark" select={() => {}} selected={false}>
              <FiMoon />
            </DropdownOption>

            <DropdownOption label="System" select={() => {}} selected={false}>
              <FiMonitor />
            </DropdownOption>
          </Dialogue>
        </div>
      )}
    </div>
  );
}

export default ToggleDarkModeButton;
