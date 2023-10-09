import React, { useMemo } from "react";
import { TodoItem } from "./TasksDrawer";

export default function TodoHeader(props: { todo: TodoItem[] }) {
  const taskCount = useMemo(() => {
    return props.todo.length;
  }, [props.todo]);

  const contextMap = useMemo(() => {
    interface ContextData {
      color: string;
      count: number;
    }

    const map = new Map<string, ContextData>();

    props.todo.forEach((item) => {
      const context = item.context.type + item.context.id;

      if (map.has(context)) {
        const prevContext = map.get(context)!;

        map.set(context, {
          ...prevContext,
          count: prevContext.count + 1,
        });
      } else {
        map.set(context, {
          color: item.context.color,
          count: 1,
        });
      }
    });

    return map;
  }, [props.todo]);

  const linearGradient = useMemo(() => {
    const gradient: any[] = [];

    contextMap.forEach((contextInfo, contextName) => {
      const percent = contextInfo.count / taskCount;
      gradient.push({
        color: contextInfo.color,
        percent,
        name: contextName,
      });
    });

    return gradient.sort((a, b) => b.percent - a.percent);
  }, [contextMap, taskCount]);

  return (
    <div className="mx-4">
      <div className="flex justify-between items-end mb-2">
        <h1 className="text-4xl font-bold">
          {taskCount}
          {taskCount > 99 ? "+" : ""}
        </h1>
        <p className="text-sm text-gray-500">
          Task{taskCount !== 1 ? "s" : ""} Remaining
        </p>
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
