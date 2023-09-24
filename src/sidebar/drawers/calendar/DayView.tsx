import React, { ReactNode, useEffect, useState } from "react";
import { CalendarEvent } from "./CalendarDrawer";
import CalendarEventDisplay from "./CalendarEventDisplay";

export default function DayView(props: {
  date: Date;
  events: CalendarEvent[];
}) {
  const { date, events } = props;
  const numEvents = events.length;

  const [earliestTime, setEarliestTime] = useState(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
  );

  const [latestTime, setLatestTime] = useState(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  );

  const firstHour = earliestTime.getHours();
  const lastHour = latestTime.getHours();

  const [allDay, setAllDay] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const EARLIEST = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59
    );
    const LATEST = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0
    );

    events.forEach((event) => {
      if (event.allDay) return;
      if (event.endAt && EARLIEST.getTime() > event.endAt.getTime()) {
        EARLIEST.setTime(event.endAt.getTime());
      }
      if (event.startAt && EARLIEST.getTime() > event.startAt.getTime()) {
        EARLIEST.setTime(event.startAt.getTime());
      }

      if (event.startAt && LATEST.getTime() < event.startAt.getTime()) {
        LATEST.setTime(event.startAt.getTime());
      }
      if (event.endAt && LATEST.getTime() < event.endAt.getTime()) {
        LATEST.setTime(event.endAt.getTime());
      }
    });

    setEarliestTime(EARLIEST);
    setLatestTime(LATEST);

    const allDayEvents = events.filter((event) => event.allDay);

    setAllDay(allDayEvents);
  }, [events, date]);

  return (
    <div className="">
      {numEvents > 0 ? (
        <div className="h-60 overflow-scroll">
          <div className="relative">
            {(() => {
              const stack: number[] = [];

              return new Array(Math.max(lastHour - firstHour + 1, 0))
                .fill(0)
                .map((_, i) => {
                  const hour = firstHour + i;

                  const eventsInHour = events.filter((event) => {
                    if (event.allDay) return false;
                    if (
                      event.startAt &&
                      event.startAt.getHours() <= hour &&
                      event.endAt &&
                      event.endAt.getHours() >= hour
                    )
                      return true;
                    return false;
                  });

                  const toAdd: number[] = [];

                  eventsInHour.forEach((event) => {
                    if (stack.includes(event.id)) return;
                    toAdd.push(event.id);
                  });

                  stack.push(...toAdd);

                  const tempStack = [...stack];

                  const eventsStartingThisHour = eventsInHour
                    .filter(
                      (event) =>
                        event.startAt && event.startAt.getHours() === hour
                    )
                    .map((event) => event.id);

                  const eventsEndingThisHour = eventsInHour
                    .filter(
                      (event) => event.endAt && event.endAt.getHours() === hour
                    )
                    .map((event) => event.id);

                  const allEventsFirst =
                    eventsStartingThisHour.length === eventsInHour.length;
                  const allEventsLast =
                    eventsEndingThisHour.length === eventsInHour.length;

                  eventsEndingThisHour.forEach((eventId) => {
                    const index = stack.indexOf(eventId);

                    if (index !== -1) stack[index] = -1;
                  });

                  while (stack[stack.length - 1] === -1) {
                    stack.pop();
                  }

                  if (eventsInHour.length === 0) return <></>;

                  return (
                    <div
                      className={`min-h-[24px] flex pl-2 ${
                        allEventsFirst ? "pt-2" : ""
                      }`}
                    >
                      {/* <p className="text-xs text-gray-400 py-1 w-8 pl-1">
                        {"" +
                          (((((hour - 1) % 12) + 12) % 12) + 1) +
                          (hour >= 12 ? "p" : "a")}
                      </p> */}
                      <CalendarEventDisplay
                        child={false}
                        events={tempStack.map((id) => {
                          const event = events.find((event) => event.id === id);

                          if (!event) return null;

                          return {
                            ...event,
                            __firstThisHour:
                              eventsStartingThisHour.includes(id),
                            __lastThisHour: eventsEndingThisHour.includes(id),
                          };
                        })}
                      />
                      {/* {tempStack.map((id) => {
                        return (
                          <div className="w-16 h-12 rounded-md bg-sky-400">
                            <p className="text-xs text-gray-400 font-bold">
                              {events.find((event) => event.id === id)?.title}
                            </p>
                          </div>
                        );
                      })} */}
                    </div>
                  );
                });
            })()}
            <div className="flex h-fit py-2 pl-2 w-full">
              <div className="flex flex-col gap-2 h-fit w-full">
                {allDay.map((event) => {
                  return (
                    <CalendarEventDisplay
                      child={false}
                      events={[
                        {
                          ...event,
                          __firstThisHour: true,
                          __lastThisHour: true,
                        },
                      ]}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-60 flex justify-center items-center">
          <p className="box-b text-gray-400">No events</p>
        </div>
      )}
    </div>
  );
}
