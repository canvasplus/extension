function ContentMeta(props: { contentType: string; titleLine: string }) {
  return (
    <div className="border-b border-slate-200 w-fit pb-4">
      <p className="text-cyan-700">{props.contentType}</p>
      <p className="text-2xl font-semibold text-light-sys-heading dark:text-dark-sys-heading">
        {props.titleLine}
      </p>
    </div>
  );
}

export default ContentMeta;
