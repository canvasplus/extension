import { IoContrast } from "solid-icons/io";
import { ContentToolbarButtonProps } from "../ContentMetaToolbar";
import ContentTopButton from "../ContentTopButton";

function ToggleDarkModeButton(props: ContentToolbarButtonProps) {
  return (
    <div>
      <ContentTopButton
        tooltip="Toggle Dark Mode"
        removingSignal={props.removingSignal}
        onClick={() => {}}
        dragSignal={props.dragSignal}
      >
        <IoContrast />
      </ContentTopButton>
    </div>
  );
}

export default ToggleDarkModeButton;
