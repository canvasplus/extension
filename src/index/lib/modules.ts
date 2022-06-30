import axios from "axios";
import { PropAliases } from "solid-js/web";
import { getDatabase, getLastUpdated, useCollection } from "./database";
import { Course } from "./types/Course";
import { CourseTab } from "./types/CourseTab";
import { Module } from "./types/Module";
import { toMs } from "./util";

export const fetchModules = async (courseId: number): Promise<Module[]> => {
  let modules = [];

  for (let i = 1; ; i++) {
    const { data } = await axios.get(
      `/api/v1/courses/${courseId}/modules?include=items&page=${i}&per_page=50`
    );

    if (data.errors) {
      throw data;
    }

    modules = modules.concat(data);

    if (data.length < 50) {
      break;
    }
  }

  return modules;
};

export const getModules = (courseId: number): Promise<Module[]> => {
  return new Promise((resolve) => {
    getLastUpdated(`modules/${courseId}`, toMs(1, "H")).then((lastUpdated) => {
      if (lastUpdated) {
        const query = getDatabase()
          .table("modules")
          .where("courseId")
          .equals(courseId)
          .toArray();

        query.then(resolve);
      } else {
        fetchModules(courseId).then((modules) => {
          const reformatted = modules.map((module) => {
            return {
              ...module,
              courseId,
            };
          });

          const transaction = getDatabase()
            .table("modules")
            .bulkPut(reformatted);

          transaction.then(() => {
            useCollection(`modules/${courseId}`);
            resolve(reformatted);
          });
        });
      }
    });
  });
};
