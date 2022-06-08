import "../../global.css";
import { Accessor, createSignal, Setter, Show } from "solid-js";
import "tailwindcss/tailwind.css";
import {
  IoAddCircle,
  IoCloseCircle,
  IoRemoveCircle,
  IoSearch,
} from "solid-icons/io";
import { CanvasDomain } from "../../lib/CanvasDomain";

export default function DomainSearch(props: {
  domains: Accessor<CanvasDomain[]>;
  setDomains: Setter<CanvasDomain[]>;
}) {
  const [query, setQuery] = createSignal("");
  const [suggestions, setSuggestions] = createSignal<CanvasDomain[]>([]);
  const [focused, setFocused] = createSignal(false);

  setSuggestions([
    { name: "School A", url: "school-a.instructure.com" },
    { name: "School B", url: "school-b.instructure.com" },
  ]);

  return (
    <div>
      <div
        className={`flex flex-row justify-between p-4 bg-white items-center focus-within:bg-slate-50 transition-colors duration-150 peer ${
          suggestions().length === 0
            ? "rounded-md"
            : "rounded-t-md rounded-b-md focus-within:rounded-b-none"
        }`}
      >
        <input
          className="w-full outline-none bg-inherit"
          type="text"
          value={query()}
          onInput={(e) => {
            setQuery(e.currentTarget.value);
          }}
          placeholder="Find your school or district"
          onFocus={() => {
            setFocused(true);
          }}
        />
        <IoSearch className="text-lg text-gray" />
      </div>
      {/* @ts-ignore */}
      <Show when={focused()}>
        <div>
          {suggestions().map((suggestion) => {
            const existing = props
              .domains()
              .findIndex((e) => e.url === suggestion.url);

            const onClick = (e) => {
              setFocused(false);

              if (existing !== -1) {
                const newDomains = props.domains();
                newDomains.splice(existing, 1);

                props.setDomains(newDomains);

                chrome.storage.sync.set({ "canvas-domains": newDomains });
              } else {
                const newDomains = props.domains();
                newDomains.push(suggestion);
                props.setDomains(newDomains);

                chrome.storage.sync.set({ "canvas-domains": newDomains });
              }
            };

            return (
              <div
                className={`flex flex-row justify-between border-t-slate-200 border-t p-4 hover:bg-blue-500 hover:text-white cursor-pointer group last:rounded-b-md ${
                  existing !== -1 ? "bg-slate-100" : "bg-white"
                }`}
                onClick={onClick}
              >
                <p onClick={onClick}>{suggestion.name}</p>
                <span
                  className="text-xl text-gray group-hover:text-white block"
                  onClick={onClick}
                >
                  {existing !== -1 ? <IoCloseCircle /> : <IoAddCircle />}
                </span>
              </div>
            );
          })}
        </div>
      </Show>
    </div>
  );
}
