import { createEffect, createSignal } from "solid-js";
import { useProgress } from "../../../lib/context/progress";
import { getSinglePage } from "../../../lib/pages";
import { Page } from "../../../lib/types/Page";
import ErrorWrapper from "../../util/ErrorWrapper";
import Loading from "../../util/Loading";
import ContentMeta from "../util/ContentMeta";
import parse from "color-parse";
import {
  DARK_BACKGROUND_RGB,
  getLuminance,
  improveContrast,
  LIGHT_BACKGROUND_RGB,
  RECCOMENDED_READING_CONTRAST,
} from "../../../lib/color";
import { useDarkMode } from "../../../lib/context/darkMode";

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

  function correctColors() {
    body.querySelectorAll("*").forEach((element) => {
      const color = parse(window.getComputedStyle(element).color);
      if (color.space === "rgb") {
        const improved = improveContrast(
          color.values,
          LIGHT_BACKGROUND_RGB,
          RECCOMENDED_READING_CONTRAST
        );

        if (improved) {
          element.style.color = `rgb(${improved[0]} ${improved[1]} ${improved[2]})`;
        }
      }
    });
  }

  createEffect(() => {
    const dark = darkMode();
    if (page()) {
      body.innerHTML = page().body;

      correctColors();
    }
  });

  return (
    <ErrorWrapper error={errorSignal}>
      {page() ? (
        <div className="text-left m-8 flex flex-col gap-4">
          <ContentMeta contentType="Page" titleLine={page().title} />
          <div
            ref={body}
            className="text-light-sys-par dark:text-dark-sys-par"
          />
        </div>
      ) : (
        <Loading />
      )}
    </ErrorWrapper>
  );
}
