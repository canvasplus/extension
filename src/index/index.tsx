import { render } from "solid-js/web";
import "../global.css";
import "tailwindcss/tailwind.css";
import { createSignal } from "solid-js";
import Sidebar from "./components/base/Sidebar";
import SplitScreen from "./components/base/SplitScreen";
import { isPathnameCompatible } from "./lib/compatibility";

const Index: Function = () => {
  const [titleState, setTitleState] = createSignal("");

  const [route, setRoute] = createSignal(
    new URL(location.href).searchParams.get("ourl")
  );

  const redirectFullURL = (to?: string, title?: string) => {
    if (to != null) setRoute(to);
    if (title != null) setTitleState(title);

    chrome.runtime.sendMessage({
      action: "redirect",
      to: to ?? route(),
      titleState: title ?? titleState(),
    });
  };

  const sendToFullURL = (to?: string, title?: string) => {
    if (to != null) setRoute(to);
    if (title != null) setTitleState(title);

    chrome.runtime.sendMessage({
      action: "sendTo",
      to: to ?? route(),
      titleState: title ?? titleState(),
    });
  };

  const setTitle = (newTitle: string, addToHistory: boolean) => {
    if (addToHistory) {
      sendToFullURL(undefined, newTitle);
    } else {
      redirectFullURL(undefined, newTitle);
    }
  };

  const setURL = (url: string, addToHistory: boolean) => {
    if (url) {
      sendToFullURL(url, undefined);
    } else {
      redirectFullURL(url, undefined);
    }
  };

  const setPathname = (pathname: string, addToHistory: boolean) => {
    const asURL = new URL(route());
    asURL.pathname = pathname;
    setURL(asURL.toString(), addToHistory);
  };

  const setParam = (k: string, v: string, addToHistory: boolean) => {
    const asURL = new URL(route());
    asURL.searchParams.set(k, v);
    setURL(asURL.toString(), addToHistory);
  };

  const removeParam = (k: string, v: string, addToHistory: boolean) => {
    const asURL = new URL(route());
    asURL.searchParams.delete(k);
    setURL(asURL.toString(), addToHistory);
  };

  if (!isPathnameCompatible(route())) {
    setTimeout(() => {
      setParam("view", "original", true);
      location.href = route();
    }, 1000);
  }

  return (
    <div className="">
      <SplitScreen />
      {/* <h1 className="text-red-500">Canvas+</h1>
      <button
        onClick={() => {
          setTitle("Dashboard", false);
          setPathname("dashboard", true);
        }}
      >
        Dashboard
      </button> */}
    </div>
  );
};

render(() => <Index />, document.querySelector("#root")!);
