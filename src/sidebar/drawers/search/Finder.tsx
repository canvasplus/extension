import React, { useState } from "react";
import { search } from "../../../util/search";
import { SearchItem } from "../../../util/coreResources";

export default function Finder(props: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  const [results, setResults] = useState<SearchItem[]>([]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
        value={props.searchQuery}
        onInput={(e) => {
          const newQuery = (e.target as HTMLInputElement).value;

          props.setSearchQuery(newQuery);

          if (newQuery.length > 2) {
            search(newQuery, 10).then((res) => {
              setResults(res);
            });
          }
        }}
      />

      <div>
        {results.map((result) => (
          <div className="p-2 border-b border-gray-300">
            <h4>{result.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
