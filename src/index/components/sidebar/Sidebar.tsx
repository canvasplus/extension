import { createSignal } from "solid-js";
import { getCourses } from "../../lib/courseList";
import { Course } from "../../lib/types/Course";

export default function Sidebar(props) {
  const [courses, setCourses] = createSignal<Course[] | undefined>(undefined);

  const placeholder = () => {
    if (courses() === undefined) return <p>Loading</p>;
    else if (courses().length === 0) return <p>Nothing to see here</p>;
    else return undefined;
  };

  getCourses().then((c) => {
    setCourses(c);
  });

  return (
    <div className="w-60 h-full bg-cyan-100">
      {placeholder() ?? <p>other</p>}
    </div>
  );
}
