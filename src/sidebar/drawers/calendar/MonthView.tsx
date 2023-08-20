import React, { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CalendarEvent } from "./CalendarDrawer";
import { TransitionStyles } from "../../../util/TransitionStyles";
import { Transition } from "react-transition-group";

function numDaysInPreviousMonth(month: number, year: number) {
  if (month === 0) return numDaysInMonth(11, year - 1);
  return numDaysInMonth(month - 1, year);
}

function numDaysInMonth(month: number, year: number) {
  if (month === 0) return 31;
  if (month === 1) {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) return 29;
    else return 28;
  }
  if (month === 2) return 31;
  if (month === 3) return 30;
  if (month === 4) return 31;
  if (month === 5) return 30;
  if (month === 6) return 31;
  if (month === 7) return 31;
  if (month === 8) return 30;
  if (month === 9) return 31;
  if (month === 10) return 30;
  if (month === 11) return 31;

  return 0;
}

function getDay(
  YEAR: number,
  MONTH: number,
  x: number,
  y: number
): {
  day: number;
  inMonth: boolean;
  month: number;
  year: number;
} {
  // x day of week in yth week of month, year
  const firstDay = new Date(YEAR, MONTH, 1);

  const firstDayWeek = firstDay.getDay();

  const day = y * 7 + x - firstDayWeek + 1;

  if (day <= 0)
    return {
      day: numDaysInPreviousMonth(MONTH, YEAR) + day,
      inMonth: false,
      month: (MONTH - 1) % 12,
      year: MONTH - 1 < 0 ? YEAR - 1 : YEAR,
    };
  if (numDaysInMonth(MONTH, YEAR) < day) {
    return {
      day: day - numDaysInMonth(MONTH, YEAR),
      inMonth: false,
      month: (MONTH + 1) % 12,
      year: MONTH + 1 > 11 ? YEAR + 1 : YEAR,
    };
  }

  return {
    day,
    inMonth: true,
    month: MONTH,
    year: YEAR,
  };
}

export default function MonthView(props: {
  month: number;
  year: number;
  calendarDates: Record<string, CalendarEvent[]>;
}) {
  const numberWeekLines = useMemo(() => {
    const firstDay = new Date(props.year, props.month, 1);
    const lastDay = new Date(props.year, props.month + 1, 0);
    const firstDayWeek = firstDay.getDay();
    const days = lastDay.getDate();
    const weeks = Math.ceil((days + firstDayWeek) / 7);
    return weeks;
  }, [props.month, props.year]);

  const [hoveredDate, setHoveredDate] = useState<string | undefined>(undefined);
  const [hoveredDateDisplay, setHoveredDateDisplay] = useState<
    string | undefined
  >(undefined);

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (hoveredDate !== undefined) {
      setShowTooltip(true);
      setHoveredDateDisplay(hoveredDate);
    } else {
      const timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 400);

      const timeout2 = setTimeout(() => {
        setHoveredDateDisplay(undefined);
      }, 500);

      return () => {
        clearTimeout(timeout);
        clearTimeout(timeout2);
      };
    }
  }, [hoveredDate]);

  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const tooltipStyles: TransitionStyles = {
    entering: {
      opacity: 0,
      "--tw-scale-x": 0.5,
      "--tw-scale-y": 0.5,
    } as React.CSSProperties,
    entered: {
      transitionProperty: "transform, opacity",
    },
    exiting: {
      transitionProperty: "transform, opacity",
      "--tw-scale-x": 0.5,
      "--tw-scale-y": 0.5,
      opacity: 0,
    } as React.CSSProperties,
    exited: {
      opacity: 0,
    },
    unmounted: {},
  };

  return (
    <div className="flex flex-col gap-2 relative mx-6 w-fit">
      <Transition
        nodeRef={tooltipRef}
        in={showTooltip}
        timeout={75}
        unmountOnExit={true}
      >
        {(state) => (
          <div
            className={`absolute top-1/2 -translate-y-1/2 left-full transform duration-150 transition-none origin-left flex items-start z-50`}
            ref={tooltipRef}
            style={tooltipStyles[state]}
          >
            <div className="w-2 h-4 mt-4">
              <div className="border-solid border-r-rose-100 border-r-8 border-y-transparent border-y-8 border-l-0" />
            </div>
            <div className="my-2 text-sm whitespace-nowrap">
              <div className="bg-rose-100 text-rose-500 rounded-md">
                <div className="px-4 text-left py-1.5 text-xs border-b-rose-700/10 border-b-2  text-gray-400">
                  <p>
                    {hoveredDateDisplay &&
                      new Date(hoveredDateDisplay).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                  </p>
                </div>
                <div className="w-40 text-gray-500">
                  {hoveredDateDisplay &&
                  props.calendarDates?.[hoveredDateDisplay]?.length > 0 ? (
                    props.calendarDates?.[hoveredDateDisplay]?.map((event) => {
                      return (
                        <div>
                          <p>{event.title}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-4 py-2 text-gray-400">
                      <p>No events</p>
                    </div>
                  )}
                </div>

                {hoveredDateDisplay &&
                  props.calendarDates?.[hoveredDateDisplay]?.length > 0 && (
                    <div className="px-4 text-left py-1.5 text-xs border-t-rose-700/10 border-t-2 text-gray-400">
                      <p>Click for more details</p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </Transition>
      {new Array(numberWeekLines).fill(0).map((_, y) => {
        return (
          <div className="flex flex-row gap-2">
            {new Array(7).fill(0).map((_, x) => {
              const dayResponse = getDay(props.year, props.month, x, y);

              const day = dayResponse.day;
              const inMonth = dayResponse.inMonth;
              const month = dayResponse.month;
              const year = dayResponse.year;

              const numAssignments =
                props.calendarDates?.[`${year}-${month + 1}-${day}`]?.length;

              return (
                <div
                  className="w-8 h-8 flex items-center justify-center relative"
                  onMouseOver={() => {
                    setHoveredDate(`${year}-${month + 1}-${day}`);
                  }}
                  onMouseLeave={() => {
                    setHoveredDate(undefined);
                  }}
                >
                  <span className={inMonth ? "text-black" : "text-gray-400"}>
                    {day}
                  </span>
                  <span
                    className={`absolute -top-2 -left-2 -right-2 -bottom-2 p-2 rounded-full origin-center transition-transform ease-in-out duration-1000 ${
                      numAssignments === 0 || numAssignments == null
                        ? ""
                        : "bg-orange-500/30 hover:bg-orange-500/50"
                    }`}
                    style={{
                      transform: `scale(${
                        numAssignments === 0 || numAssignments == null
                          ? 0
                          : Math.min(numAssignments / 5 + 0.35, 1.35)
                      })`,
                    }}
                  ></span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
