import { createEffect, createSignal } from "solid-js";
import { getSinglePage } from "../../../lib/pages";
import { Page } from "../../../lib/types/Page";

export default function PageContent(props: {
  courseId: number;
  pageId: string;
}) {
  const [page, setPage] = createSignal<Page | null>(null);

  getSinglePage(props.courseId, props.pageId).then(setPage);
  getSinglePage(123, props.pageId)
    .then((e) => console.log(e))
    .catch((e) => console.log(e));

  return (
    <div>
      <h1>PageContent</h1>
      <p>{page()?.id}</p>
    </div>
  );
}
