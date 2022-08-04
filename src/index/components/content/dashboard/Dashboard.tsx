import Dexie from "dexie";
import { createEffect, createSignal } from "solid-js";
import { useProgress } from "../../../lib/context/progress";
import { getDatabase } from "../../../lib/database";
import convert from "color-convert";

export default function Dashboard() {
  const [startLoading, stopLoading, progress] = useProgress();

  stopLoading();

  const [hue, sethue] = createSignal(0);

  function svOffet(h) {
    return Math.abs(((h + 35) % 360) - 180) / 18;
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button
        className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 text-white active:scale-90 transition-all"
        onClick={() => {
          Dexie.delete(getDatabase().name);

          location.reload();
        }}
      >
        Clear Database
      </button>
      {/* <input
        value={hue()}
        onInput={(e) => {
          sethue(parseInt(e.target.value));
        }}
        type="range"
        min="0"
        max="360"
      />
      <div className="w-30 h-96 flex flex-row flex-1 relative">
        <div
          className="h-full w-1/3"
          style={{
            "background-color": `#${convert.hsv.hex(
              hue(),
              35 + svOffet(hue()),
              35 + svOffet(hue())
            )}`,
          }}
        ></div>
        <div className="h-full w-2/3 bg-dark-sys-bg"></div>
      </div> */}
    </>
  );
}
