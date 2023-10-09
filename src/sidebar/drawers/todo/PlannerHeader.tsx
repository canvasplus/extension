import React, { useEffect, useMemo, useState } from "react";
import TodoChart from "./TodoHeader";
import TodoCategories from "./TodoCategories";
import {
  getColors,
  getCourses,
  getGroups,
  getTodoItems,
} from "../../../util/coreResources";
import { PlannerItem } from "./TasksDrawer";

export default function PlannerHeader(props: { items: PlannerItem[] }) {
  const itemCount = useMemo(() => {
    return props.items.length;
  }, [props.items]);

  const contextMap = useMemo(() => {
    interface ContextData {
      color: string;
      count: number;
      upcomingCount: number;
    }

    const map = new Map<string, ContextData>();

    props.items.forEach((item) => {
      const DAYS_7 = 7 * 24 * 60 * 60 * 1000;

      const isUpcoming =
        new Date(item.date).getTime() - new Date().getTime() < DAYS_7;

      if (map.has(item.context.code)) {
        const prevContext = map.get(item.context.code)!;

        map.set(item.context.code, {
          ...prevContext,
          count: prevContext.count + 1,
          upcomingCount: isUpcoming
            ? prevContext.upcomingCount + 1
            : prevContext.upcomingCount,
        });
      } else {
        map.set(item.context.code, {
          color: item.context.color,
          count: 1,
          upcomingCount: isUpcoming ? 1 : 0,
        });
      }
    });

    return map;
  }, [props.items]);

  const totalUpcoming = useMemo(() => {
    return Array.from(contextMap.values()).reduce((acc, curr) => {
      return acc + curr.upcomingCount;
    }, 0);
  }, [contextMap]);

  const linearGradient = useMemo(() => {
    const gradient: any[] = [];

    contextMap.forEach((contextInfo, contextName) => {
      const percent =
        totalUpcoming > 0 ? contextInfo.upcomingCount / totalUpcoming : 0;
      gradient.push({
        color: contextInfo.color,
        percent,
        name: contextName,
      });
    });

    return gradient.sort((a, b) => b.percent - a.percent);
  }, [contextMap, itemCount]);

  return (
    <div className="mx-4">
      <div className="flex justify-between items-end mb-2">
        <h1 className="text-4xl font-bold">
          {totalUpcoming}
          {totalUpcoming > 99 ? "+" : ""}
        </h1>
        <p className="text-sm text-gray-500">Upcoming This Week</p>
      </div>
      <div className="w-full h-4 rounded-sm overflow-hidden relative flex">
        {linearGradient.map((context) => {
          return (
            <div
              className="h-full"
              style={{
                width: `${context.percent * 100}%`,
                backgroundColor: context.color,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
