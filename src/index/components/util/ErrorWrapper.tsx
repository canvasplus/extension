import {
  createEffect,
  createSignal,
  ErrorBoundary,
  JSX,
  Signal,
} from "solid-js";

import { serializeError } from "serialize-error";

function ErrorComponent(props: { error: any }) {
  const { error } = props;

  function heading(): { title: string; subheading: string } {
    if (error.name === "AxiosError") {
      return {
        title: "A Network Error Occurred",
        subheading:
          "This typically happens when you try to access an invalid page or resource.",
      };
    } else {
      return {
        title: "A Page Error Occurred",
        subheading:
          "This is an unspecified error that is likely a bug in Canvas+.",
      };
    }
  }

  return (
    <div className="bg-red-200 w-full h-full flex justify-center items-center">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-lg font-bold text-gray-dark">{heading().title}</h1>
        <p className="text-gray">{heading().subheading}</p>
        <p>{JSON.stringify(error)}</p>
      </div>
    </div>
  );
}

function ErrorWrapper(props: { children?: JSX.Element; error?: Signal<any> }) {
  const [error, setError] = props.error || createSignal<any>(null);

  function handleError(e) {
    console.error(e);

    setError(e);
    return <ErrorComponent error={error()} />;
  }

  return (
    <>
      {error() ? (
        <ErrorComponent error={error()} />
      ) : (
        <ErrorBoundary children={props.children} fallback={handleError} />
      )}
    </>
  );
}

export default ErrorWrapper;
