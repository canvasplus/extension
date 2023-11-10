import { useCallback, useEffect, useState } from "react";
import Button from "../../../util/Button";
import SegmentedControl from "../../../util/SegmentedControl";
import BinaryCarousel from "../../../util/BinaryCarousel";
import Finder from "./Finder";
import { indexSearch } from "../../../util/search";
import { SearchItem } from "../../../util/coreResources";

export default function SearchDrawer(props: { close: () => void }) {
  const [view, setView] = useState("find");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState<SearchItem[]>([]);
  const [searchContent, setSearchContent] = useState<SearchItem[]>([]);
  useEffect(() => {
    indexSearch().then((res: SearchItem[]) => {
      setSearchIndex(res);
    });
  }, []);

  return (
    <div className="h">
      <div className="w-full h-screen">
        <div className="absolute top-0 left-0 z-50 bg-rose-50 w-full border-b-2 border-rose-700/10 ">
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-lg">Search</h3>
            <div className="flex gap-2">
              <Button type="primary" size="sm" onClick={props.close}>
                Close
              </Button>
              <SegmentedControl
                items={[
                  {
                    name: "Find",
                    value: "find",
                  },
                  {
                    name: "Chat",
                    value: "chat",
                  },
                ]}
                setItem={setView}
                current={view}
              />
            </div>
          </div>
        </div>
        <div className="relative h-screen overflow-y-scroll pt-28">
          <BinaryCarousel index={view === "find" ? 0 : 1}>
            <Finder setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
            <Finder setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
          </BinaryCarousel>
        </div>
      </div>
    </div>
  );
}
