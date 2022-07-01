import axios from "axios";
import { PropAliases } from "solid-js/web";
import { getDatabase, getLastUpdated, useCollection } from "./database";
import { Course } from "./types/Course";
import { CourseTab } from "./types/CourseTab";
import { Page } from "./types/Page";
import { toMs } from "./util";

export const fetchPages = async (courseId: number): Promise<Page[]> => {
  let pages = [];

  for (let i = 1; ; i++) {
    const { data } = await axios.get(
      `/api/v1/courses/${courseId}/pages?page=${i}&per_page=50`
    );

    if (data.errors) {
      throw data;
    }

    pages = pages.concat(data);

    if (data.length < 50) {
      break;
    }
  }

  return pages;
};

export const getPages = (courseId: number): Promise<Page[]> => {
  return new Promise((resolve) => {
    getLastUpdated(`pages/${courseId}`, toMs(1, "H")).then((lastUpdated) => {
      if (lastUpdated) {
        const query = getDatabase()
          .table("pages")
          .where("courseId")
          .equals(courseId)
          .toArray();

        query.then(resolve);
      } else {
        fetchPages(courseId).then((pages) => {
          const reformatted = pages.map((page) => {
            return {
              ...page,
              courseId,
              id: page["page_id"],
              page_id: undefined,
            };
          });

          const transaction = getDatabase().table("pages").bulkPut(reformatted);

          transaction.then(() => {
            useCollection(`pages/${courseId}`);
            resolve(reformatted);
          });
        });
      }
    });
  });
};

export const fetchSinglePage = async (
  courseId: number,
  urlOrId: string
): Promise<Page> => {
  const { data } = await axios.get(
    `/api/v1/courses/${courseId}/pages/${urlOrId}`
  );

  if (data.errors) {
    throw data;
  }

  const reformatted = {
    id: data["url"],
    numberId: data["page_id"],
    title: data["title"],
    updated: data["updated_at"],
    created: data["created_at"],
    body: data["body"],
    published: data["published"],
    isFrontPage: data["front_page"],
    isLocked: data["locked_for_user"],
    lockExplanation: data["lock_explanation"],
  };

  return reformatted;
};

export const getSinglePage = (
  courseId: number,
  urlOrId: string
): Promise<Page> => {
  return new Promise((resolve) => {
    getLastUpdated(`pages/${courseId}/${urlOrId}`, toMs(3, "H")).then(
      (lastUpdated) => {
        if (lastUpdated) {
          const query = getDatabase()
            .table("itemBodies")
            .get({ courseId, itemType: "pages", id: urlOrId });

          query.then(resolve);
        } else {
          fetchSinglePage(courseId, urlOrId).then((page) => {
            const reformatted = {
              ...page,
              courseId,
              itemType: "pages",
            };

            const transaction = getDatabase()
              .table("itemBodies")
              .put(reformatted);

            transaction.then((e) => {
              if (page.id === urlOrId) {
                useCollection(`pages/${courseId}/${page.id}`);
              }

              resolve(page);
            });
          });
        }
      }
    );
  });
};
