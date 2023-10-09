// keep a cache of the api resources and store the last time they were updated

import getAllPages from "./getAllPages";
import axios from "redaxios";

// so we can refresh them if they are stale
export interface CacheItem {
  status: CacheStatus;
  data?: any;
}
export interface CacheStatus {
  lastUpdated: number;
  stale: boolean;
}

export type ToleranceLevel = "5MIN" | "1HOUR" | "1DAY" | "1WEEK" | "1MONTH";

export const TOLERANCE_LEVELS = {
  "5MIN": 5 * 60 * 1000,
  "1HOUR": 60 * 60 * 1000,
  "1DAY": 24 * 60 * 60 * 1000,
  "1WEEK": 7 * 24 * 60 * 60 * 1000,
  "1MONTH": 30 * 24 * 60 * 60 * 1000,
};

export function getCanvasContext(): Promise<string> {
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      const domain = window.location.hostname;
      resolve(domain);
    } else {
      window.addEventListener("load", () => {
        const domain = window.location.hostname;
        resolve(domain);
      });
    }
  });
  //   return new Promise((resolve) => {
  //     if (document.readyState === "complete") {
  //       const domain = window.location.hostname;
  //       // @ts-ignore
  //       resolve(domain + "_" + window["ENV"]["current_user"]["id"]);
  //     } else {
  //       window.addEventListener("load", () => {
  //         const domain = window.location.hostname;
  //         // @ts-ignore
  //         resolve(domain + "_" + window["ENV"]["current_user"]["id"]);
  //       });
  //     }
  //   });
}

export async function getCacheItem(
  key: string,
  tolerance: ToleranceLevel
): Promise<CacheItem> {
  const CONTEXT = await getCanvasContext();
  const fullKey = "cache." + CONTEXT + "." + key;

  const storageGet = new Promise<CacheItem>((resolve) => {
    chrome.storage.local.get([fullKey], (result) => {
      if (result[fullKey]) {
        const lastUpdated = result[fullKey].lastUpdated;
        const now = Date.now();
        const toleranceLevel = TOLERANCE_LEVELS[tolerance];

        if (now - lastUpdated < toleranceLevel) {
          resolve({
            data: result[fullKey].data,
            status: {
              lastUpdated: lastUpdated,
              stale: false,
            },
          });
        } else {
          resolve({
            status: {
              lastUpdated: lastUpdated,
              stale: true,
            },
          });
        }
      } else {
        resolve({ status: { lastUpdated: 0, stale: true } });
      }
    });
  });

  const storageGetResult: CacheItem = await storageGet;

  return storageGetResult;
}

export async function setCacheItem(key: string, data: any): Promise<void> {
  const CONTEXT = await getCanvasContext();
  const fullKey = "cache." + CONTEXT + "." + key;

  const storageSet = new Promise<void>((resolve) => {
    chrome.storage.local.set(
      {
        [fullKey]: {
          data: data,
          lastUpdated: Date.now(),
        },
      },
      () => {
        resolve();
      }
    );
  });

  await storageSet;
}

export async function getCourses() {
  const cacheItem = await getCacheItem("courses", "1HOUR");

  if (cacheItem.status.stale) {
    const courses = await getAllPages(
      "/api/v1/courses?include[]=tabs&include[]=favorites"
    );
    await setCacheItem("courses", courses);
    return courses;
  } else {
    return cacheItem.data;
  }
}

export async function getGroups() {
  const cacheItem = await getCacheItem("groups", "1HOUR");

  if (cacheItem.status.stale) {
    const courses = await getAllPages("/api/v1/users/self/groups");
    await setCacheItem("groups", courses);
    return courses;
  } else {
    return cacheItem.data;
  }
}

export async function getColors() {
  const cacheItem = await getCacheItem("colors", "1WEEK");

  if (cacheItem.status.stale) {
    const colors = (await axios.get("/api/v1/users/self/colors")).data;
    await setCacheItem("colors", colors);
    return colors;
  } else {
    return cacheItem.data;
  }
}

export async function getTodoItems() {
  const cacheItem = await getCacheItem("todoItems", "5MIN");

  if (cacheItem.status.stale) {
    const todoItems = await getAllPages("/api/v1/users/self/todo");
    await setCacheItem("todoItems", todoItems);
    console.log(todoItems);

    return todoItems;
  } else {
    return cacheItem.data;
  }
}

export async function getPlannedItems() {
  const cacheItem = await getCacheItem("plannerItems", "5MIN");

  const startingDate = new Date();
  startingDate.setDate(startingDate.getDate() - 7);

  if (cacheItem.status.stale) {
    const plannedItems = await getAllPages(
      // YYYY-MM-DD
      `/api/v1/planner/items?start_date=${
        startingDate.toISOString().split("T")[0]
      }`
    );
    await setCacheItem("plannerItems", plannedItems);
    return plannedItems;
  } else {
    return cacheItem.data;
  }
}
