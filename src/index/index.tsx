import { render } from "solid-js/web";
import "../global.css";
import "tailwindcss/tailwind.css";
import { createEffect, createSignal, onMount } from "solid-js";
import Sidebar from "./components/sidebar/Sidebar";
import SplitScreen from "./components/base/SplitScreen";
import Router from "./components/router/Router";
import Case from "./components/router/Case";
import DefaultView from "./components/base/DefaultView";
import { getDatabase, getLastUpdated, initiate } from "./lib/database";
import Axios from "axios";
import { fetchCourses, getCourses } from "./lib/courseData";
import { LocationProvider, useLocation } from "./lib/context/location";
import { SetToken, SetID } from "./lib/token";
import sync from "css-animation-sync";
import GraphQL from "./lib/graphQL";
import Dexie from "dexie";
import PageContent from "./components/content/page/PageContent";
import isNumber from "is-number";
import ErrorWrapper from "./components/util/ErrorWrapper";
import { SidebarProvider } from "./lib/context/sidebar";
import { isPathnameCompatible } from "./lib/compatibility";
import { ProgressProvider, useProgress } from "./lib/context/progress";
import ProgressBar from "./components/router/ProgressBar";
import Dashboard from "./components/content/dashboard/Dashboard";
import { DarkModeProvider, useDarkMode } from "./lib/context/darkMode";

const Index: Function = () => {
  sync("spin");

  // GraphQL(`
  //   allCourses {
  //     name
  //   }
  // `);

  const [
    { getCurrentLocation, getFullLocation },
    { setFullLocation, doneLoading },
  ] = useLocation();

  const [startLoading, stopLoading] = useProgress();

  const [dbReady, setDbReady] = createSignal(false);

  const initialURL = location.href;

  setFullLocation({
    route: initialURL,
  });

  initiate(new URL(initialURL).hostname).then(() => {
    setDbReady(true);
  });

  const setRoute = (route: string) => {
    setFullLocation({ route });
  };

  createEffect(() => {
    const location = getFullLocation();

    if (location.prev) {
      doneLoading();
    }
  });

  createEffect((previous) => {
    const current = getCurrentLocation();

    if (previous === current || location.href === current) return current;

    if (isPathnameCompatible(current)) {
      window.history.pushState({}, "", current);
      startLoading();
    } else {
      location.href = current;
    }

    return current;
  });

  chrome.runtime.onMessage.addListener((message) => {
    message.action == "setToken" ? SetToken(message.token) : null;
  });

  SetID();

  const routePathname = () => {
    return new URL(getCurrentLocation()).pathname.replace(/\/+$/, "");
  };

  const path = () =>
    new URL(getCurrentLocation()).pathname.split("/").filter((n) => n);

  Axios.defaults.baseURL = `${new URL(getCurrentLocation()).origin}`;

  const appReady = () => {
    return dbReady();
  };

  startLoading();

  const [darkMode, setDarkMode, darkModeMethod, setDarkModeMethod] =
    useDarkMode();

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  mediaQuery.addEventListener("change", (e) => {
    if (darkModeMethod() === "system") {
      setDarkMode(e.matches);
    }
  });

  createEffect(() => {
    if (darkMode()) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  createEffect(() => {
    if (darkModeMethod() === "light") setDarkMode(false);
    else if (darkModeMethod() === "dark") setDarkMode(true);
    else if (darkModeMethod() === "system") setDarkMode(mediaQuery.matches);
  });

  window.addEventListener("popstate", function (e) {
    setFullLocation({
      route: location.href,
    });
  });

  return (
    <>
      {appReady() ? (
        <SidebarProvider sidebar={<Sidebar />}>
          <Router route={getCurrentLocation}>
            <Case
              filter={(u, n, p) => n === ""}
              element={() => {
                return (
                  <DefaultView>
                    <Dashboard />
                  </DefaultView>
                );
              }}
            />

            <Case
              filter={(u, n, p) => p[2] === "pages" && isNumber(p[1])}
              element={() => (
                <DefaultView>
                  <PageContent
                    courseId={Number.parseInt(path()[1])}
                    pageId={path()[3]}
                  />
                </DefaultView>
              )}
            />
          </Router>
        </SidebarProvider>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

render(() => {
  return (
    <DarkModeProvider>
      <ProgressProvider>
        <LocationProvider>
          <Index />
        </LocationProvider>
      </ProgressProvider>
    </DarkModeProvider>
  );
}, document.querySelector("#root")!);
