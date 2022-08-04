import { createEffect, createSignal } from "solid-js";
import { useProgress } from "../../../lib/context/progress";
import { getSinglePage } from "../../../lib/pages";
import { Page } from "../../../lib/types/Page";
import ErrorWrapper from "../../util/ErrorWrapper";
import Loading from "../../util/Loading";
import ContentMeta from "../util/ContentMeta";

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
  return (
    <ErrorWrapper error={errorSignal}>
      {page() ? (
        <div className="text-left m-8 flex flex-col gap-4">
          <ContentMeta contentType="Page" titleLine={page().title} />
          <p innerHTML={page()?.body} />
        </div>
      ) : (
        <Loading />
      )}
    </ErrorWrapper>
  );
}
