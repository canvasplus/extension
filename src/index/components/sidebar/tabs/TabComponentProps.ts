import { CourseTab } from "../../../lib/types/CourseTab";

export default interface TabComponentProps {
  tab: CourseTab;
  courseId: number;
  path(): string[];
  parentHighlighted(): boolean;
}
