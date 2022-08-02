// import { createSignal } from "solid-js";
// import { render } from "solid-js/web";
// import { LocationProvider, useLocation } from "./lib/context/location";

// function Index() {
//   const [
//     { getCurrentLocation, getFullLocation },
//     { setFullLocation, doneLoading },
//   ] = useLocation();

//   const [dbReady, setDbReady] = createSignal(false);

//   const initialURL = location.href;

//   setFullLocation({
//     route: initialURL,
//   });

//   console.log(getCurrentLocation());

//   return <p>Loading ...</p>;
// }
// render(() => {
//   return (
//     <LocationProvider>
//       <Index />
//     </LocationProvider>
//   );
// }, document.querySelector("#root")!);

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

const Index: Function = () => {
  sync("spin");

  GraphQL(`
    allCourses {
      name
    }
  `);

  const [
    { getCurrentLocation, getFullLocation },
    { setFullLocation, doneLoading },
  ] = useLocation();

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

  createEffect(() => {
    const current = getCurrentLocation();

    if (isPathnameCompatible(current)) {
      window.history.pushState({}, "", current);
    } else {
      location.href = current;
    }
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

  return (
    <>
      {appReady() ? (
        <SidebarProvider sidebar={<Sidebar />}>
          <Router route={getCurrentLocation}>
            <Case
              filter={(u, n, p) => n === ""}
              element={() => (
                <DefaultView>
                  <h1>Dashboard</h1>
                  <button
                    onClick={() => {
                      Dexie.delete(getDatabase().name);

                      location.reload();
                    }}
                  >
                    Clear IndexedDB
                  </button>
                </DefaultView>
              )}
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

            {/* <Case filter={() => routePathname() === ""}>
            <DefaultView>
              <h1>Dashboard</h1>
              <button
                onClick={() => {
                  Dexie.delete(getDatabase().name);

                  location.reload();
                }}
              >
                Clear IndexedDB
              </button>
            </DefaultView>
          </Case>

          <Case filter={() => path()[2] === "pages"}>
            <DefaultView>
              <PageContent courseId={path()[1]} pageId={path()[3]} />
            </DefaultView>
          </Case> */}
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
    <LocationProvider>
      <Index />
    </LocationProvider>
  );
}, document.querySelector("#root")!);
