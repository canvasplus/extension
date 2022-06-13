import { render } from "solid-js/web";
import "../global.css";
import { createSignal, Show } from "solid-js";
import "tailwindcss/tailwind.css";
import { isPathnameCompatible } from "../index/lib/compatibility";

const Top: Function = () => {
  const [url, setURL] = createSignal(
    new URL(location.href).searchParams.get("ourl")
  );

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (
      !sender.tab &&
      (message.action === "sendTo" || message.action === "redirect")
    ) {
      setURL(message.to);
    }
  });

  const pageIncompatible = isPathnameCompatible(url());

  return (
    <div className="w-full bg-red-200 h-20">
      {pageIncompatible ? "compatible" : "not compatible"}
    </div>
  );
};

render(() => <Top />, document.querySelector("#root")!);
