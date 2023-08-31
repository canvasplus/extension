import React from "react";
import { CalendarEvent } from "./CalendarDrawer";
import Color from "color";

export default function CalendarEventDisplay(props: {
  events: (CalendarEvent | null)[];
  child: boolean;
}) {
  if (props.events.length === 0) return null;

  const event = props.events[0];

  if (event == null) {
    return (
      <div className="border-l-2 border-transparent pl-3 w-full h-6">
        <div className="h-full">
          <CalendarEventDisplay events={props.events.slice(1)} child={true} />
        </div>
      </div>
    );
  }
  return (
    <div
      className={`w-full overflow-hidden h-full 
    ${event && event.__firstThisHour ? "rounded-tl-md" : ""} ${
        event && event.__lastThisHour ? "rounded-bl-md" : ""
      }
    `}
    >
      <div
        className={`pl-3 w-full border-l-2 ${
          props.events.length === 1 && !props.child && !event.__firstThisHour
            ? "h-6 min-h-full"
            : "h-full"
        }`}
        style={{
          borderColor: event.color,
          backgroundColor: Color(event.color).alpha(0.05).string(),
        }}
      >
        {event && event.__firstThisHour && (
          <div
            className="leading-tight py-1 pr-2"
            style={{
              color: event.color,
            }}
          >
            <p className="text-xs">
              {event.startAt?.toLocaleTimeString([], {
                hour: "numeric",
                minute: "numeric",
              })}{" "}
            </p>
            <p className="text-sm font-semibold">{event.title}</p>
          </div>
        )}
        <div className="h-full">
          <CalendarEventDisplay events={props.events.slice(1)} child={true} />
        </div>
      </div>
    </div>
  );
}
