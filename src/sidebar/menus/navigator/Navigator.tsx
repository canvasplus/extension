import React from "react";

export default function Navigator() {
  const LINKS = [
    ["Dashboard", "/"],
    ["Courses", "/courses"],
    ["Calendar", "/calendar"],
  ];

  return (
    <div>
      <div className="px-4 text-left py-2 text-sm border-b-rose-700/10 border-b-2  text-gray-400">
        <p>Navigator</p>
      </div>
      <div className="flex flex-col text-sm text-left">
        {LINKS.map(([name, link]) => (
          <a
            href={link}
            className="block px-4 py-2 hover:bg-rose-700/10 border-b-rose-700/10 border-b-2 last:border-b-0 text-gray-500 hover:text-gray-500 no-underline pr-8"
          >
            {name}
          </a>
        ))}
      </div>
    </div>
  );
}
