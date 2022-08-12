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

  return (
    <div className="flex flex-row gap-2">
      <ContentTopButton
        tooltip="Previous Page"
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiArrowLeft />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Next Page"
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiArrowRight />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Reload"
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <IoRefresh />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Back to Course"
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiFolder />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Search"
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiSearch />
      </ContentTopButton>

      <ContentTopButton
        tooltip="View Original"
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <FiEye />
      </ContentTopButton>

      <ContentTopButton
        tooltip="Toggle Dark Mode"
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <IoContrast />
      </ContentTopButton>

      <ContentMoreButton
        tooltip="More Options"
        onClick={() => {}}
        dragSignal={dragSignal}
      >
        <IoEllipsisVerticalOutline />
      </ContentMoreButton>
    </div>
  );
}

export default ContentMetaToolbar;
