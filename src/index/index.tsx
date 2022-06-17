import { render } from "solid-js/web";
import "../global.css";
import "tailwindcss/tailwind.css";
import { createEffect, createSignal } from "solid-js";
import Sidebar from "./components/sidebar/Sidebar";
import SplitScreen from "./components/base/SplitScreen";
import Router from "./components/router/Router";
import Case from "./components/router/Case";
import DefaultView from "./components/base/DefaultView";
import { getLastUpdated, initiate } from "./lib/database";
import axios from "axios";
import { fetchCourses, getCourses } from "./lib/courseData";
import { LocationProvider, useLocation } from "./lib/context/location";

import sync from "css-animation-sync";
const Index: Function = () => {
  sync("spin");

  const [
    { getCurrentLocation, getFullLocation },
    { setFullLocation, doneLoading },
  ] = useLocation();

  const [dbReady, setDbReady] = createSignal(false);

  initiate().then(() => {
    setDbReady(true);
  });

  setFullLocation({
    route: new URL(location.href).searchParams.get("ourl"),
  });

  const setRoute = (route: string) => {
    setFullLocation({ route });
  };

  createEffect(() => {
    console.log("doing done loading");

    const location = getFullLocation();

    if (location.prev) {
      doneLoading();
    }
  });

  createEffect(() => {
    chrome.runtime.sendMessage({
      action: "sendTo",
      to: getCurrentLocation(),
    });
  });

  // const [route, setRoute] = createSignal(
  //   new URL(location.href).searchParams.get("ourl")
  // );

  // const redirectFullURL = (to?: string, title?: string) => {
  //   if (to != null) setRoute(to);
  //   if (title != null) setTitleState(title);

  //   chrome.runtime.sendMessage({
  //     action: "redirect",
  //     to: to ?? getCurrentLocation(),
  //     titleState: title ?? titleState(),
  //   });
  // };

  // const sendToFullURL = (to?: string, title?: string) => {
  //   if (to != null) setRoute(to);
  //   if (title != null) setTitleState(title);

  //   chrome.runtime.sendMessage({
  //     action: "sendTo",
  //     to: to ?? getCurrentLocation(),
  //     titleState: title ?? titleState(),
  //   });
  // };

  // const setTitle = (newTitle: string, addToHistory: boolean) => {
  //   if (addToHistory) {
  //     sendToFullURL(undefined, newTitle);
  //   } else {
  //     redirectFullURL(undefined, newTitle);
  //   }
  // };

  // const setURL = (url: string, addToHistory: boolean) => {
  //   if (url) {
  //     sendToFullURL(url, undefined);
  //   } else {
  //     redirectFullURL(url, undefined);
  //   }
  // };

  // const setPathname = (pathname: string, addToHistory: boolean) => {
  //   const asURL = new URL(getCurrentLocation());
  //   asURL.pathname = pathname;
  //   setURL(asURL.toString(), addToHistory);
  // };

  // const setParam = (k: string, v: string, addToHistory: boolean) => {
  //   const asURL = new URL(getCurrentLocation());
  //   asURL.searchParams.set(k, v);
  //   setURL(asURL.toString(), addToHistory);
  // };

  // const removeParam = (k: string, v: string, addToHistory: boolean) => {
  //   const asURL = new URL(getCurrentLocation());
  //   asURL.searchParams.delete(k);
  //   setURL(asURL.toString(), addToHistory);
  // };

  const routePathname = () =>
    new URL(getCurrentLocation()).pathname.replace(/\/+$/, "");

  axios.defaults.baseURL = `${new URL(getCurrentLocation()).origin}/api/v1`;

  const appReady = () => {
    return dbReady();
  };

  createEffect(() => {
    if (appReady()) {
      console.log(getCurrentLocation);
    }
  });

  return (
    <>
      {appReady() ? (
        <Router route={getCurrentLocation}>
          <></>

          <Case filter={routePathname() === ""}>
            <DefaultView>
              <h1>Dashboard</h1>
            </DefaultView>
          </Case>
        </Router>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

render(() => {
  return <LocationProvider children={<Index />} />;
}, document.querySelector("#root")!);
