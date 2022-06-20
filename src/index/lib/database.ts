export const initiate = (hostname: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const indexedDb = window.indexedDB;

    if (indexedDb) {
      const request = indexedDb.open(`cpx-caching-${hostname}`);

      request.onerror = (event) => {
        console.log("error");
        return false;
      };

      request.onupgradeneeded = (event) => {
        const { oldVersion } = event;

        // @ts-ignore
        const db: IDBDatabase = event.target.result;

        if (oldVersion < 1) {
          db.createObjectStore("courses", { keyPath: "id" });
          db.createObjectStore("collectionsLastUpdated", { keyPath: "name" });
        }
      };

      request.onsuccess = (event) => {
        // @ts-ignore
        window["cpxCachingDb"] = event.target.result;
        resolve();
      };
    } else {
      reject();
    }
  });
};

export const getDatabase = (): IDBDatabase => {
  return window["cpxCachingDb"];
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
      const query = getDatabase()
        .transaction(["collectionsLastUpdated"])
        .objectStore("collectionsLastUpdated")
        .get(name);

      query.onsuccess = (e) => {
        resolve(query.result?.timestamp ?? 0);
      };
    });
  }
};

export const useCollection = (name: string) => {
  getDatabase()
    .transaction(["collectionsLastUpdated"], "readwrite")
    .objectStore("collectionsLastUpdated")
    .put({ name, timestamp: Date.now() });
};
