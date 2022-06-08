import { render } from "solid-js/web";
import "../global.css";
import { createSignal, Show } from "solid-js";
import { checkPermissions, PermissionRequest } from "../lib/permissionsCheck";
import "tailwindcss/tailwind.css";
import Permissions from "./components/Permissions";
import Domains from "./components/Domains";

const Index: Function = () => {
  const [stage, setStage] = createSignal(0);

  return (
    <div>
      <Show when={stage() === 0}>
        <Permissions
          next={() => {
            setStage(1);
          }}
        />
      </Show>

      <Show when={stage() === 1}>
        <Domains
          next={() => {
            setStage(2);
          }}
        />
      </Show>
    </div>
  );
};

render(() => <Index />, document.querySelector("#root")!);
