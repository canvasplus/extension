import React, { useMemo } from "react";
import { TodoItem } from "./TasksDrawer";

export default function TodoCategories(props: { todo: TodoItem[] }) {
  const taskCount = useMemo(() => {
    return props.todo.length;
  }, [props.todo]);

  const categories = useMemo(() => {
    const map: {
      [key: string]: TodoItem[];
    } = {};

    props.todo.forEach((item) => {
      if (map[item.context.code] == null) {
        map[item.context.code] = [item];
      }

      map[item.context.code].push(item);
    });

    const entriesSorted = Object.entries(map).sort(
      (a, b) => b[1].length - a[1].length
    );

    const newMap: {
      [key: string]: TodoItem[];
    } = {};

    entriesSorted.forEach((entry) => {
      newMap[entry[0]] = entry[1];
    });
    return newMap;
  }, [props.todo]);

  return (
    <div className="p-4 flex flex-col gap-4">
      {Object.keys(categories).map((categoryContextName) => {
        return (
          <div>
            <div className="flex gap-2 items-center mb-2">
              <div
                className="w-6 h-6 flex items-center justify-center rounded-full text-white text-xs"
                style={{
                  backgroundColor:
                    categories[categoryContextName][0].context.color,
                }}
              >
                {categories[categoryContextName].length}
              </div>

              <h1 className="text-lg">
                {categories[categoryContextName][0].context.displayName}
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              {categories[categoryContextName].map((item) => {
                return (
                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full border-2 border-rose-700/10 flex-shrink-0" />
                    <p className="text-gray-500 text-sm overflow-hidden overflow-ellipsis">
                      {item.assignment.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
