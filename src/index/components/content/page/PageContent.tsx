import { createEffect, createSignal } from "solid-js";
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

  return (
    <ErrorWrapper error={errorSignal}>
      <div className="text-center">
        <h1 className="text-4xl">PageContent</h1>
        <p>{page()?.id}</p>
      </div>
    </ErrorWrapper>
  );
}
