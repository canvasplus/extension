import {
  createSignal,
  createContext,
  useContext,
  Accessor,
  Setter,
  Signal,
  JSX,
} from "solid-js";

const AdjacentPagesContext = createContext<
  [
    {
      href?: string;
      label?: string;
      icon?: JSX.Element;
    },
    {
      href?: string;
      label?: string;
      icon?: JSX.Element;
    }
  ]
>();

export function AdjacentPagesProvider(props: {
  hrefPrev?: string;
  labelPrev?: string;
  iconPrev?: JSX.Element;

  hrefNext?: string;
  labelNext?: string;
  iconNext?: JSX.Element;

  children?: JSX.Element;
}) {
  return (
    <AdjacentPagesContext.Provider
      value={[
        {
          href: props.hrefPrev,
          label: props.labelPrev,
          icon: props.iconPrev,
        },
        {
          href: props.hrefNext,
          label: props.labelNext,
          icon: props.iconNext,
        },
      ]}
      children={props.children}
    />
  );
}

export function useAdjacdentPages() {
  return useContext(AdjacentPagesContext);
}
