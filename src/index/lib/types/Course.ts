import { CourseTab } from "./CourseTab";

export interface Course {
  course_code: string;
  default_view: string;
  id: number;
  name: string;
  original_name: string;
  tabs: CourseTab[];

  [x: string | number | symbol]: unknown;
}
