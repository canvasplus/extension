import React, { useMemo } from "react";
import { PlannerItem, TodoItem } from "./TasksDrawer";

export default function Planner(props: { planned: PlannerItem[] }) {
  const days = useMemo(() => {
    const days: { [key: string]: PlannerItem[] } = {};

    props.planned.forEach((item) => {
      const date = item.date.toISOString().split("T")[0];

      if (!days[date]) {
        days[date] = [];
      }

      days[date].push(item);
    });

    return days;
  }, [props.planned]);

  return (
    <div className="flex flex-col mt-4">
      {Object.keys(days).map((dateString) => {
        const date = new Date(dateString);
        const planned = days[dateString];

        const contexts: { [key: string]: PlannerItem[] } = {};

        planned.forEach((item) => {
          if (!contexts[item.context.code]) {
            contexts[item.context.code] = [];
          }

          contexts[item.context.code].push(item);
        });

        return (
          <div className="pb-4">
            <div className="relative w-full h-[2px] bg-rose-700/10" />

            <div className="h-12 w-12 bg-slate-700 text-white flex items-center justify-center rounded-sm mx-2 mt-2 mb-4">
              <div className="text-center">
                <p className="text-xs">
                  {new Date().getMonth() === date.getMonth() &&
                  new Date().getFullYear() === date.getFullYear()
                    ? date.toLocaleDateString(undefined, {
                        weekday: "short",
                      })
                    : date.toLocaleDateString(undefined, {
                        month: "short",
                      })}
                </p>
                <h1 className="text-lg">
                  {date.toLocaleDateString(undefined, {
                    day: "numeric",
                  })}
                </h1>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {Object.values(contexts).map((items) => {
                if (items.length === 0) return null;

                return (
                  <div className="flex gap-2.5 mr-4">
                    <div
                      className="opacity-50 w-1.5 rounded-r-sm flex-shrink-0"
                      style={{
                        backgroundColor: items[0].context.color,
                      }}
                    />
                    <div className="py-1">
                      <div className="flex flex-col">
                        <p
                          className="text-sm w-fit flex-1"
                          style={{
                            borderColor: items[0].context.color,
                          }}
                        >
                          {items[0].context.displayName}
                        </p>
                      </div>
                      {items.map((item) => {
                        return (
                          <div className="flex gap-2 items-center">
                            <div className="w-5 h-5 border-2 border-rose-700/10 flex-shrink-0" />
                            <p className="text-gray-500 text-base overflow-hidden overflow-ellipsis whitespace-nowrap">
                              {item.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
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
