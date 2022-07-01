import { createSignal } from "solid-js";

export const toMs = (quantity: number, unit: "m" | "H" | "D"): number => {
  switch (unit) {
    case "m":
      return quantity * 60_000;
    case "H":
      return quantity * 60_000 * 60;
    case "D":
      return quantity * 60_000 * 60 * 24;
  }
};

export const getCSRFToken = () => {
  let res: string;
  chrome.runtime.sendMessage(
    { action: "getToken" },
    (data: { token: string }) => {
      data ? (res = data.token) : null;
    }
  );
  return res;
};

// needed to save data between separate component instances in graphQL.ts
export const [query, setQuery] = createSignal("");
