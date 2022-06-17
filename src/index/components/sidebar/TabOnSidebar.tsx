import { CourseTab } from "../../lib/types/CourseTab";
import Loading from "../util/Loading";

export default function TabOnSidebar(props: {
  tab: CourseTab;
  courseId: number;
}) {
  return <Loading />;
}
