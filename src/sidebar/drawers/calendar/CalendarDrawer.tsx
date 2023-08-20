import React, { useState } from "react";
import BinaryCarousel from "../../../util/BinaryCarousel";
import Button from "../../../util/Button";
import DayPicker from "./DayPicker";
import axios from "redaxios";
import { useEffect } from "react";
import getAllPages from "../../../util/getAllPages";
import MonthView from "./MonthView";

export type CalendarEvent = {
  id: number;
  title: string;
  startAt?: Date;
  endAt?: Date;
  description?: string;
  locationName?: string;
  locationAddress?: string;
  workflowState?: "active" | "deleted" | "locked";
  hidden?: boolean;
  htmlUrl?: string;
  color?: string;
};

export default function CalendarDrawer(props: { close: () => void }) {
  const [date, setDate] = useState<Date>(new Date());

  const [calendarDates, setCalendarDates] = useState<{
    [date: string]: CalendarEvent[];
  }>({});

  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );

  useEffect(() => {
    axios
      .get("/api/v1/courses?enrollment_state=active&state=available")
      .then((res) => {
        const courseIds = res.data.map(
          (course: any) => "&context_codes[]=course_" + course.id
        );

        axios.get("/api/v1/users/self").then((res) => {
          const userId = res.data.id;

          axios.get("/api/v1/users/self/colors").then((res) => {
            const colors = res.data.custom_colors;

            const baseUrl = `/api/v1/calendar_events?context_codes[]=user_${userId}${
              courseIds.length > 0 ? courseIds.join("") : ""
            }&start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}&type=event`;

            const baseAssignmentsUrl = `/api/v1/calendar_events?context_codes[]=user_${userId}${
              courseIds.length > 0 ? courseIds.join("") : ""
            }&start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}&type=assignment`;

            const events = getAllPages(baseUrl);

            const assignents = getAllPages(baseAssignmentsUrl);

            Promise.all([events, assignents]).then((res) => {
              const allEvents = res[0]
                .concat(res[1])
                .map((e: any): CalendarEvent => {
                  return {
                    id: e.id,
                    title: e.title,
                    description: e.description,
                    endAt: new Date(e.end_at),
                    startAt: new Date(e.start_at),
                    locationName: e.location_name,
                    locationAddress: e.location_address,
                    workflowState: e.workflow_state,
                    hidden: e.hidden,
                    htmlUrl: e.html_url,
                    color: colors[e.context_code] || "#5A92DE",
                  };
                });

              const dates: { [date: string]: CalendarEvent[] } = {
                ...calendarDates,
              };

              const dontFillDates = Object.keys(dates);

              allEvents.forEach((event: CalendarEvent) => {
                const date = new Date(event.startAt!);
                const dateString = `${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`;

                if (dontFillDates.includes(dateString)) return;

                if (!dates[dateString]) dates[dateString] = [];
                dates[dateString].push(event);
              });

              setCalendarDates(dates);
            });
          });
        });
      });
  }, [startDate, endDate]);

  const [monthViewMonth, setMonthViewMonth] = useState(new Date().getMonth());

  const [monthViewYear, setMonthViewYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setStartDate(new Date(monthViewYear, monthViewMonth, 1, 0, 0, 0, 0));

    setEndDate(new Date(monthViewYear, monthViewMonth + 1, 0, 0, 0, 0, 0));
  }, [monthViewMonth, monthViewYear]);

  return (
    <div className="h">
      <div className="w-full h-screen">
        <div className="absolute top-0 left-0 z-50 bg-rose-50 w-full border-b-2 border-rose-700/10 ">
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-lg">Calendar</h3>
            <div className="flex gap-2">
              <Button type="primary" size="sm" onClick={props.close}>
                Close
              </Button>
              <Button type="secondary" size="sm" href="/calendar">
                View Fullscreen
              </Button>
            </div>
          </div>
        </div>
        <div className="pt-24">
          <DayPicker
            label={date.toLocaleString("default", { weekday: "long" })}
            onClickLeft={() => {
              setDate(new Date(date.getTime() - 86400000));
            }}
            onClickRight={() => {
              setDate(new Date(date.getTime() + 86400000));
            }}
          />
        </div>

        <DayPicker
          onClickLeft={() => {
            if (monthViewMonth === 0) {
              setMonthViewYear(monthViewYear - 1);
              setMonthViewMonth(11);
            } else {
              setMonthViewMonth(monthViewMonth - 1);
            }
          }}
          onClickRight={() => {
            if (monthViewMonth === 11) {
              setMonthViewYear(monthViewYear + 1);
              setMonthViewMonth(0);
            } else {
              setMonthViewMonth(monthViewMonth + 1);
            }
          }}
          label={
            monthViewYear === new Date().getFullYear()
              ? new Date(monthViewYear, monthViewMonth).toLocaleString(
                  "default",
                  { month: "long" }
                )
              : new Date(monthViewYear, monthViewMonth).toLocaleString(
                  "default",
                  { month: "long", year: "numeric" }
                )
          }
        />

        <MonthView
          month={monthViewMonth}
          year={monthViewYear}
          calendarDates={calendarDates}
          selectedDate={`${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`}
        />
      </div>
    </div>
  );
}
