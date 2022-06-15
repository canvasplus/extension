export interface Course {
  course_code: string;
  default_view: string;
  id: number;
  name: string;
  original_name: string;

  [x: string | number | symbol]: unknown;
}
