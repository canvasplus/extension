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
import { createSignal } from "solid-js";
import ContentMoreButton from "./ContentMoreButton";

function ContentMetaToolbar() {
  const dragSignal = createSignal(false);

  const removingSignal = createSignal(false);
  const [_, setRemoving] = removingSignal;

  return (
    <div className="flex flex-row gap-2">
      <ContentTopButton
        tooltip="Previous Page"
        onClick={() => {}}
        removingSignal={removingSignal}
        dragSignal={dragSignal}
      >
        <FiArrowLeft />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Next Page"
        removingSignal={removingSignal}
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiArrowRight />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Reload"
        removingSignal={removingSignal}
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <IoRefresh />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Back to Course"
        removingSignal={removingSignal}
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiFolder />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Search"
        removingSignal={removingSignal}
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiSearch />
      </ContentTopButton>

      <ContentTopButton
        tooltip="View Original"
        removingSignal={removingSignal}
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiEye />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Toggle Dark Mode"
        removingSignal={removingSignal}
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <IoContrast />
      </ContentTopButton>

      <ContentMoreButton
        tooltip="More Options"
        setRemoving={setRemoving}
        onClick={() => {}}
        dragSignal={dragSignal}
      />
    </div>
  );
}

export default ContentMetaToolbar;