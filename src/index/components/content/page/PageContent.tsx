import { createEffect, createSignal } from "solid-js";
import { useProgress } from "../../../lib/context/progress";
import { getPages, getSinglePage } from "../../../lib/pages";
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
import { PreviousPageProvider } from "../../../lib/context/previousPage";
import { IoDocumentOutline } from "solid-icons/io";
import { useLocation } from "../../../lib/context/location";

export default function PageContent(props: {
  courseId: number;
  pageId: string;
}) {
  const [page, setPage] = createSignal<Page | undefined>(undefined);
  const [previousPage, setPreviousPage] = createSignal<Page | undefined | null>(
    undefined
  );

  const errorSignal = createSignal(null);
  const [error, setError] = errorSignal;

  getSinglePage(props.courseId, props.pageId).then(setPage).catch(setError);

  getPages(props.courseId).then((pages) => {
    const myIndex = pages.findIndex((page) => page.id === props.pageId);

    console.log(myIndex, pages, pages[2]);

    if (myIndex <= 0) setPreviousPage(null);
    else if (pages[myIndex - 1]) {
      setPreviousPage(pages[myIndex - 1]);
    }
  });

  const [startLoading, stopLoading, progress] = useProgress();

  let body: Element | undefined;

  const [darkMode, setDarkMode] = useDarkMode();

  const bodyChangeEffect = () => {
    const dark = darkMode();
    if (page() && body) {
      body.innerHTML = page().body;
    }
  };

  createEffect(bodyChangeEffect);

  createEffect(() => {
    if (page()) {
      stopLoading();
    }
  });

  const [{ getCurrentLocation }] = useLocation();

  return (
    <ErrorWrapper error={errorSignal}>
      <>
        {page() && previousPage() !== undefined ? (
          <PreviousPageProvider
            href={
              previousPage()
                ? `${new URL(getCurrentLocation()).origin}/courses/${
                    props.courseId
                  }/pages/${previousPage()?.id}`
                : null
            }
            icon={<IoDocumentOutline />}
            label={previousPage()?.title}
          >
            <div className="text-left m-8 flex flex-col gap-4">
              <ContentMeta contentType="Page" titleLine={page().title} />

              <ColorGuard>
                <div
                  ref={body}
                  className="text-light-sys-par dark:text-dark-sys-par"
                />

                {(() => {
                  bodyChangeEffect();
                })()}
              </ColorGuard>
            </div>
          </PreviousPageProvider>
        ) : (
          <Loading />
        )}
      </>
    </ErrorWrapper>
  );
}
