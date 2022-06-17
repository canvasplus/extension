export interface CourseTab {
  html_url: string;
  full_url: string;
  id: string;
  label: string;
  position: number;
  type: "internal" | "external";

  [x: string | number | symbol]: unknown;
}
