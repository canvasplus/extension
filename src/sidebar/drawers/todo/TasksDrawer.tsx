import React, { useEffect, useRef, useState } from "react";
import BinaryCarousel from "../../../util/BinaryCarousel";
import Button from "../../../util/Button";
import TodoCategories from "./TodoCategories";
import {
  getColors,
  getCourses,
  getGroups,
  getTodoItems,
  getPlannedItems,
} from "../../../util/coreResources";
import SegmentedControl from "../../../util/SegmentedControl";
import TodoHeader from "./TodoHeader";
import PlannerHeader from "./PlannerHeader";
import Planner from "./Planner";

export type TodoItem = {
  type: "GRADING" | "SUBMITTING" | "OTHER";
  assignment: any;
  ignoreUrl: string;
  ignorePermanentlyUrl: string;
  htmlUrl: string;
  context: {
    type: "COURSE" | "GROUP";
    id: number;
    color: string;
    code: string;
    displayName: string;
  };
};

export type PlannerItem = {
  context: {
    type: "COURSE" | "GROUP";
    id: number;
    color: string;
    code: string;
    displayName: string;
  };
  name: string;
  type: "DISCUSSION" | "ASSIGNMENT" | "TODO";
  date: Date;
  id: number;
  completed: boolean;
};

export default function TasksDrawer(props: { close: () => void }) {
  const [view, setView] = useState("todo");
  const [todo, setTodo] = useState<TodoItem[]>([]);
  const [planned, setPlanned] = useState<PlannerItem[]>([]);

  useEffect(() => {
    const todoPromise = getTodoItems();
    const plannedItemsPromise = getPlannedItems();
    const colorsPromise = getColors();
    const coursesPromise = getCourses();
    const groupsPromise = getGroups();

    Promise.all([
      todoPromise,
      colorsPromise,
      coursesPromise,
      groupsPromise,
      plannedItemsPromise,
    ]).then((values) => {
      const todoRaw = values[0];
      const colorsRaw = values[1].custom_colors;
      const coursesRaw = values[2];
      const groupsRaw = values[3];
      const plannedItemsRaw = values[4];

      setPlanned(
        plannedItemsRaw.map((event: any): PlannerItem => {
          const contextId =
            event.context_type === "Course" ? event.course_id : event.group_id;

          const contextCode =
            (event.context_type as string).toLowerCase() + "_" + contextId;

          const contextDisplayName =
            event.context_type === "Course"
              ? coursesRaw.find((course: any) => course.id === contextId)?.name
              : groupsRaw.find((group: any) => group.id === contextId)?.name;

          return {
            date: new Date(event.plannable_date),
            name: event.plannable.title,
            context: {
              code: contextCode,
              id: contextId,
              displayName: contextDisplayName,
              color: colorsRaw[contextCode] || "#5A92DE",
              type: (event.context_type as string).toUpperCase() as
                | "COURSE"
                | "GROUP",
            },
            type:
              event.plannable_type === "discussion_topic"
                ? "DISCUSSION"
                : event.plannable_type === "assignment"
                ? "ASSIGNMENT"
                : "TODO",
            id: event.plannable_id,
            completed: event?.plannable_override?.marked_complete || false,
          };
        })
      );

      setTodo(
        todoRaw.map((todo: any): TodoItem => {
          const contextId =
            todo.context_type === "Course" ? todo.course_id : todo.group_id;
          const contextCode =
            (todo.context_type as string).toLowerCase() + "_" + contextId;

          const contextDisplayName =
            todo.context_type === "Course"
              ? coursesRaw.find((course: any) => course.id === contextId)?.name
              : groupsRaw.find((group: any) => group.id === contextId)?.name;

          return {
            type:
              todo.type === "grading"
                ? "GRADING"
                : todo.type === "submitting"
                ? "SUBMITTING"
                : "OTHER",
            assignment: todo.assignment,
            ignoreUrl: todo.ignore_url,
            ignorePermanentlyUrl: todo.ignore_permanently_url,
            htmlUrl: todo.html_url,
            context: {
              type: (todo.context_type as string).toUpperCase() as
                | "COURSE"
                | "GROUP",
              id: contextId,
              color: colorsRaw[contextCode],
              code: contextCode,
              displayName: contextDisplayName,
            },
          };
        })
      );
    });
  }, []);

  return (
    <div className="h">
      <div className="w-full h-screen">
        <div className="absolute top-0 left-0 z-50 bg-rose-50 w-full border-b-2 border-rose-700/10 ">
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-lg">Tasks</h3>
            <div className="flex gap-2">
              <Button type="primary" size="sm" onClick={props.close}>
                Close
              </Button>
              <SegmentedControl
                items={[
                  {
                    name: "Todo",
                    value: "todo",
                  },
                  {
                    name: "Planner",
                    value: "planner",
                  },
                ]}
                setItem={setView}
                current={view}
              />
            </div>
          </div>
        </div>
        <div className="relative h-screen overflow-y-scroll pt-28">
          {view === "todo" ? (
            <TodoHeader todo={todo} />
          ) : (
            <PlannerHeader items={planned} />
          )}

          <BinaryCarousel index={view === "todo" ? 0 : 1}>
            <TodoCategories todo={todo} />
            <Planner planned={planned} />
          </BinaryCarousel>
        </div>
      </div>
    </div>
  );
}
