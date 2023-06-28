// default export
type TransitionStyles = Record<
  "entering" | "entered" | "exiting" | "exited" | "unmounted",
  React.HTMLAttributes<HTMLDivElement>["style"]
>;

export type { TransitionStyles };
