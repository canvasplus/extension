import axios from "axios";
import { getDatabase, getLastUpdated, useCollection } from "./database";
import { Course } from "./types/Course";
import { CourseTab } from "./types/CourseTab";
import { toMs } from "./util";

export const fetchCourses = async (): Promise<Course[]> => {
  const { data } = await axios.get("users/self/favorites/courses", {
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
        console.log("getting from cache");

        const query = getDatabase()
          .transaction(["courses"])
          .objectStore("courses")
          .getAll();

        query.onsuccess = () => resolve(query.result);
      } else {
        console.log("getching");
        fetchCourses().then((courses) => {
          const transaction = getDatabase().transaction(
            ["courses"],
            "readwrite"
          );

          const objectStore = transaction.objectStore("courses");

          courses.forEach((c) => objectStore.put(c));

          transaction.oncomplete = () => {
            useCollection("courses");
            resolve(courses);
          };
        });
      }
    });
  });
};
