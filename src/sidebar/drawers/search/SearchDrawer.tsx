import { useCallback, useEffect, useState } from "react";
import Button from "../../../util/Button";
import SegmentedControl from "../../../util/SegmentedControl";
import BinaryCarousel from "../../../util/BinaryCarousel";
import Finder from "./SearchView";
import { indexSearch, search } from "../../../util/search";
import { SearchItem } from "../../../util/coreResources";
import SearchResultGroup from "./SearchItemGroup";
import SearchResultDisplay from "./SearchItemDisplay";
import SearchResults from "./SearchResults";

export default function SearchDrawer(props: { close: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);

  useEffect(() => {
    search(searchQuery, 5).then((res) => {
      setSearchResults(res);
    });
  }, [searchQuery]);

  return (
    <div className="h">
      <div className="w-full h-screen">
        <div className="absolute top-0 left-0 z-50 bg-rose-50 w-full border-b-2 border-rose-700/10 ">
          <div className="flex flex-col">
            <div className="flex px-4 py-2 justify-between items-end">
              <h3 className="text-sm">Search</h3>
              <div className="flex">
                <Button type="secondary" size="xs" onClick={props.close}>
                  Close
                </Button>
              </div>
            </div>
            <input
              className="w-full !px-4 !py-6 !text-base !m-0 !focus:outline-none !border-0 !rounded-none !shadow-none "
              type="text"
              placeholder="Search through your courses"
              value={searchQuery}
              onInput={(e) => {
                setSearchQuery((e.target as HTMLInputElement).value);
              }}
            />
          </div>
        </div>
        <div className="pt-24 px-4">
          <SearchResults results={searchResults} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}
