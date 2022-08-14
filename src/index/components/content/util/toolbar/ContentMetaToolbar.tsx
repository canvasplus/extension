import {
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiFolder,
  FiHome,
  FiSearch,
} from "solid-icons/fi";
import {
  IoContrast,
  IoContrastOutline,
  IoEllipsisVerticalOutline,
  IoEyeOutline,
  IoHomeOutline,
  IoRefresh,
  IoRefreshOutline,
  IoReload,
  IoReloadOutline,
  IoSearchOutline,
} from "solid-icons/io";
import { HiSolidEye } from "solid-icons/hi";
import ContentTopButton from "./ContentTopButton";
import { createSignal, Signal } from "solid-js";
import ContentMoreButton from "./ContentMoreButton";
import ToggleDarkModeButton from "./buttons/ToggleDarkModeButton";
import PreviousPageButton from "./buttons/PreviousPageButton";
import NextPageButton from "./buttons/NextPageButton";

type ContentToolbarButtonProps = {
  dragSignal: Signal<boolean>;
  removingSignal: Signal<boolean>;
};

function ContentMetaToolbar() {
  const dragSignal = createSignal(false);

  const removingSignal = createSignal(false);
  const [_, setRemoving] = removingSignal;

  const props = { dragSignal, removingSignal };
  return (
    <div className="flex flex-row gap-2">
      <PreviousPageButton {...props} />

      <NextPageButton {...props} />

      <ContentTopButton
        tooltip="Reload"
        active={() => false}
        removingSignal={removingSignal}
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <IoRefresh />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Back to Course"
        active={() => false}
        removingSignal={removingSignal}
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiFolder />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Search"
        active={() => false}
        removingSignal={removingSignal}
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiSearch />
      </ContentTopButton>

      <ContentTopButton
        tooltip="View Original"
        active={() => false}
        removingSignal={removingSignal}
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiEye />
      </ContentTopButton>

      <ToggleDarkModeButton {...props} />

      <ContentMoreButton
        tooltip="More Options"
        setRemoving={setRemoving}
        onClick={() => {}}
        dragSignal={dragSignal}
      />
    </div>
  );
}

export { ContentMetaToolbar, ContentToolbarButtonProps };
