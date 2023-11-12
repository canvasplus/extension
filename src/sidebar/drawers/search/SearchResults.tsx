import React, { useEffect, useState } from "react";
import { SearchItem } from "../../../util/coreResources";
import SearchItemGroup from "./SearchItemGroup";
import SearchItemDisplay from "./SearchItemDisplay";

export default function SearchResults(props: {
  results: SearchItem[];
  searchQuery: string;
}) {
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    setHighlightIndex(0);
  }, [props.searchQuery]);

  useEffect(() => {
    const length = props.results.length;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setHighlightIndex((prev) => (prev + 1) % length);
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setHighlightIndex((prev) => (prev - 1 + length) % length);
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.results.length]);

  return (
    <div>
      {props.results.length > 0 && (
        <div>
          <SearchItemGroup label="Top Results">
            {props.results.map((item, idx) => {
              return (
                <SearchItemDisplay
                  title={item.title}
                  description={item.title}
                  url={item.url}
                  small
                  index={idx}
                  highlightIndex={highlightIndex}
                />
              );
            })}
          </SearchItemGroup>
        </div>
      )}
    </div>
  );
}
