import { createEffect, createSignal } from "solid-js";
import { useProgress } from "../../../lib/context/progress";
import { getSinglePage } from "../../../lib/pages";
import { Page } from "../../../lib/types/Page";
import ErrorWrapper from "../../util/ErrorWrapper";

export default function PageContent(props: {
  courseId: number;
  pageId: string;
}) {
  const [page, setPage] = createSignal<Page | null>(null);

  const errorSignal = createSignal(null);
  const [error, setError] = errorSignal;

  getSinglePage(props.courseId, props.pageId).then(setPage).catch(setError);

  const [startLoading, stopLoading, progress] = useProgress();

  createEffect(() => {
    if (page() && progress() === "LOADING") {
      stopLoading();
    }
  });
  return (
    <ErrorWrapper error={errorSignal}>
      <div className="text-center">
        <h1 className="text-4xl">PageContent</h1>
        <p innerHTML={page()?.body} />
      </div>
    </ErrorWrapper>
  );
}
