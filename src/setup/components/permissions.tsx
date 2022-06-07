import { render } from "solid-js/web";
import "../../global.css";
import { createSignal } from "solid-js";
import {
  checkPermissions,
  PermissionRequest,
} from "../../lib/permissionsCheck";
import "tailwindcss/tailwind.css";

export const Permissions: Function = (props: { next(): void }) => {
  const [permissions, setPermissions] = createSignal<
    PermissionRequest | undefined
  >(undefined);

  checkPermissions().then((p) => {
    if (p.descriptions.length === 0) props.next();
    else setPermissions(p);
  });

  const requestPermissions = () => {
    if (permissions()) {
      chrome.permissions.request(permissions().permissions, (granted) => {
        if (granted) props.next();
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 text-sm">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-3xl">More Permissions</h1>
        <p>Canvas+ needs the following permissions for a new update:</p>
      </div>
      <div className="flex flex-col gap-4 w-128 mx-auto">
        {permissions()?.descriptions.map((desc) => {
          return (
            <div className="flex flex-col gap-2 bg-white rounded-lg p-4">
              <p className="text-gray-dark">{desc.title}</p>
              <p className="text-gray">{desc.description}</p>
            </div>
          );
        })}
      </div>
      <button
        disabled={!permissions}
        className="bg-blue-500 disabled:opacity-50 text-white w-fit mx-auto px-4 py-2 rounded-md"
        onClick={requestPermissions}
      >
        Continue
      </button>
    </div>
  );
};
