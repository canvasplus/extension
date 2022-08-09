import { createEffect, createSignal } from "solid-js";
import { useProgress } from "../../../lib/context/progress";
import { getSinglePage } from "../../../lib/pages";
import { Page } from "../../../lib/types/Page";
import ErrorWrapper from "../../util/ErrorWrapper";
import Loading from "../../util/Loading";
import ContentMeta from "../util/ContentMeta";
import {
  DARK_BACKGROUND_RGB,
  getLuminance,
  HSPtoRGB,
  improveContrast,
  LIGHT_BACKGROUND_RGB,
  RECCOMENDED_READING_CONTRAST,
  RGBtoHSP,
} from "../../../lib/color";
import { useDarkMode } from "../../../lib/context/darkMode";
import ColorGuard from "../../util/ColorGuard";

export default function PageContent(props: {
  courseId: number;
  pageId: string;
}) {
  const [page, setPage] = createSignal<Page | undefined>(undefined);

  const errorSignal = createSignal(null);
  const [error, setError] = errorSignal;

  getSinglePage(props.courseId, props.pageId).then(setPage).catch(setError);

  const [startLoading, stopLoading, progress] = useProgress();

  createEffect(() => {
    if (page()) {
      stopLoading();
    }
  });

  let body: Element | undefined;

  const [darkMode, setDarkMode] = useDarkMode();

  createEffect(() => {
    const dark = darkMode();
    if (page()) {
      body.innerHTML = page().body;
    }
  });

  // darkMode() ? DARK_BACKGROUND_RGB : LIGHT_BACKGROUND_RGB

  return (
    <ErrorWrapper error={errorSignal}>
      {page() ? (
        <div className="text-left m-8 flex flex-col gap-4">
          <ContentMeta contentType="Page" titleLine={page().title} />

          <ColorGuard>
            <div
              ref={body}
              className="text-light-sys-par dark:text-dark-sys-par"
            />
          </ColorGuard>
        </div>
      ) : (
        <Loading />
      )}
    </ErrorWrapper>
  );
}
