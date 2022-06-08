import "../../global.css";
import { createSignal } from "solid-js";
import "tailwindcss/tailwind.css";
import { CanvasDomain } from "../../lib/CanvasDomain";
import { IoCloseCircle } from "solid-icons/io";
import DomainSearch from "./DomainSearch";
export default function Domains(props: { next(): void }) {
  const [domains, setDomains] = createSignal<CanvasDomain[]>([], {
    equals: false,
  });

  chrome.storage.sync.get(["canvas-domains"]).then((data) => {
    setDomains(data["canvas-domains"] ?? []);
  });

  const removeDomain = (idx: number) => {
    return () => {
      const newDomains = domains();
      newDomains.splice(idx, 1);
      console.log(newDomains);

      setDomains(newDomains);

      chrome.storage.sync.set({ "canvas-domains": newDomains });
    };
  };

  return (
    <div>
      <div className="w-128 flex flex-col gap-8 mx-auto">
        <div>
          {domains().length !== 0 && (
            <p className="text-gray-dark mb-2">Existing Domains</p>
          )}

          <div className="flex flex-col gap-2">
            {domains().map((domain, idx) => {
              return (
                <div className="flex flex-row justify-between bg-white rounded-lg p-4 items-center">
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-dark">{domain.name}</p>
                    <p className="text-gray">{domain.url}</p>
                  </div>
                  <div
                    className="hover:bg-slate-200 p-1 rounded-md cursor-pointer"
                    onClick={removeDomain(idx)}
                  >
                    <IoCloseCircle className="text-xl text-gray" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-gray-dark mb-2">Add New Domain</p>
          <DomainSearch domains={domains} setDomains={setDomains} />
        </div>
      </div>
    </div>
  );
}
