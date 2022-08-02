import Dexie from "dexie";
import { createEffect } from "solid-js";
import { useProgress } from "../../../lib/context/progress";
import { getDatabase } from "../../../lib/database";

export default function Dashboard() {
  const [startLoading, stopLoading, progress] = useProgress();

  createEffect(() => {
    if (progress() === "LOADING") {
      stopLoading();
    }
  });

  return (
    <>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          Dexie.delete(getDatabase().name);

          location.reload();
        }}
      >
        Clear IndexedDB
      </button>
    </>
  );
}
