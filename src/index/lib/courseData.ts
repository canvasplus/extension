import axios from "axios";
import { getDatabase, getLastUpdated, useCollection } from "./database";
import { Course } from "./types/Course";
import { CourseTab } from "./types/CourseTab";
import { toMs } from "./util";

export const fetchCourses = async (): Promise<Course[]> => {
  const { data } = await axios.get("/api/v1/users/self/favorites/courses", {
    params: { include: ["tabs"] },
  });

  if (data.errors) {
    throw data;
  }

  return data;
};

export const getCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    getLastUpdated("courses", toMs(3, "D")).then((lastUpdated) => {
      if (lastUpdated) {
        const query = getDatabase().table("courses").toArray();

        query.then(resolve);
      } else {
        fetchCourses().then((courses) => {
          getDatabase()
            .table("courses")
            .bulkPut(courses)
            .then(() => {
              useCollection("courses");
              resolve(courses);
            });
        });
      }
    });
  });
};
