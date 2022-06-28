import * as assert from "assert";
import Dexie from "dexie";

export const initiate = async (hostname: string): Promise<void> => {
  const db = new Dexie(`cpx-caching-${hostname}`);

  window["cpxCachingDb"] = {
    db,
    clear: () => {
      Dexie.delete(`cpx-caching-${hostname}`);
    },
  };

  db.version(1).stores({
    courses: "id",
    collectionsLastUpdated: "name",
    pages: "[courseId+id]",
    itemBodies: "[courseId+itemType+id]",
  });
};

export const getDatabase = (): Dexie => {
  return window["cpxCachingDb"].db;
};

export const getLastUpdated = (
  name: string,
  tolerance?: number
): Promise<number> => {
  if (tolerance != null) {
    return new Promise((resolve) => {
      getLastUpdated(name).then((u) => {
        resolve(Date.now() - u <= tolerance ? 1 : 0);
      });
    });
  } else {
    return new Promise((resolve) => {
      getDatabase()
        .table("collectionsLastUpdated")
        .get(name)
        .then((u) => {
          resolve(u?.timestamp ?? 0);
        });
    });
  }
};

export const useCollection = (name: string) => {
  getDatabase().table("collectionsLastUpdated").put({
    name,
    timestamp: Date.now(),
  });
};
