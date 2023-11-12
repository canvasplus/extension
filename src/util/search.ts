import {
  Course,
  CourseTab,
  ModuleItem,
  SearchItem,
  getCacheItem,
  getCourses,
  getModules,
  setCacheItem,
} from "./coreResources";

// @ts-ignore
import trigramSimilarity from "trigram-similarity";

export async function searchCourseModules(
  course: Course
): Promise<SearchItem[]> {
  const modules = await getModules(course.id, true);

  const returnable: SearchItem[] = [];

  modules.forEach((module: any) => {
    const moduleId: number = module.id;

    const moduleItems = module.items.map((item: any): ModuleItem => {
      const typeIsInternal =
        item.type === "Assignment" ||
        item.type === "Page" ||
        item.type === "Quiz" ||
        item.type === "Discussion";

      let pureUrl: string = typeIsInternal ? "" : item.external_url;

      if (item.type === "Assignment") {
        pureUrl = `/courses/${course.id}/assignments/${item.content_id}`;
      } else if (item.type === "Page") {
        pureUrl = `/courses/${course.id}/pages/${item.page_url}`;
      } else if (item.type === "Quiz") {
        pureUrl = `/courses/${course.id}/quizzes/${item.content_id}`;
      } else if (item.type === "Discussion") {
        pureUrl = `/courses/${course.id}/discussion_topics/${item.content_id}`;
      }

      return {
        id: item.id,
        title: item.title,
        type:
          item.type === "Assignment"
            ? "ASSIGNMENT"
            : item.type === "Page"
            ? "PAGE"
            : item.type === "Quiz"
            ? "QUIZ"
            : item.type === "Discussion"
            ? "DISCUSSION"
            : item.type === "ExternalTool"
            ? "EXTERNAL_TOOL"
            : "EXTERNAL_URL",
        contentId: item.content_id,
        courseId: course.id,
        htmlUrl: item.html_url,
        pureUrl,
        moduleId: moduleId,
      };
    });

    returnable.push(
      ...moduleItems.map((item: ModuleItem): SearchItem => {
        return {
          title: item.title,
          url: item.htmlUrl,
          courseId: item.courseId,
          moduleId: [item.moduleId],
        };
      })
    );
  });

  return returnable;
}

export async function searchCoursePages(course: Course): Promise<SearchItem[]> {
  return [];
}

export async function searchCourseAssignments(
  course: Course
): Promise<SearchItem[]> {
  return [];
}

export async function searchCourseQuizzes(
  course: Course
): Promise<SearchItem[]> {
  return [];
}

export async function searchCourseFiles(course: Course): Promise<SearchItem[]> {
  return [];
}

export async function searchCourseDiscussions(
  course: Course
): Promise<SearchItem[]> {
  return [];
}

export async function searchCourse(course: Course): Promise<SearchItem[]> {
  const returnable: SearchItem[] = [];

  let searchModules = false;
  let searchPages = false;
  let searchQuizzes = false;
  let searchFiles = false;
  let searchDiscussions = false;

  for (let tab of course.tabs) {
    if (tab.id === "modules") {
      searchModules = true;
    } else if (tab.id === "pages") {
      searchPages = true;
    } else if (tab.id === "quizzes") {
      searchQuizzes = true;
    } else if (tab.id === "files") {
      searchFiles = true;
    } else if (tab.id === "discussions") {
      searchDiscussions = true;
    }
  }

  const modulesPromise = async () => {
    if (searchModules) {
      returnable.push(...(await searchCourseModules(course)));
    }
  };

  const pagesPromise = async () => {
    if (searchPages) {
      returnable.push(...(await searchCoursePages(course)));
    }
  };

  const quizzesPromise = async () => {
    if (searchQuizzes) {
      returnable.push(...(await searchCourseQuizzes(course)));
    }
  };

  const filesPromise = async () => {
    if (searchFiles) {
      returnable.push(...(await searchCourseFiles(course)));
    }
  };

  const discussionsPromise = async () => {
    if (searchDiscussions) {
      returnable.push(...(await searchCourseDiscussions(course)));
    }
  };

  const assignmentsPromise = async () => {
    returnable.push(...(await searchCourseAssignments(course)));
  };

  await Promise.all([
    modulesPromise(),
    pagesPromise(),
    quizzesPromise(),
    filesPromise(),
    discussionsPromise(),
    assignmentsPromise(),
  ]);

  return returnable;
}

export async function indexSearch() {
  const coursesRaw = await getCourses();

  let searchIndex: SearchItem[] = [];

  for (let courseRaw of coursesRaw) {
    const course: Course = {
      id: courseRaw.id,
      name: courseRaw.name,
      tabs: courseRaw.tabs.map((tab: any): CourseTab => {
        return {
          id: tab.id,
          label: tab.label,
          type: tab.type.toUpperCase(),
          url: tab.html_url,
        };
      }),
    };

    searchIndex.push(...(await searchCourse(course)));
  }

  return searchIndex;
}

export async function getSearchIndex(): Promise<SearchItem[]> {
  const cacheItem = await getCacheItem("searchIndex", "1HOUR");

  if (cacheItem.status.stale) {
    const searchIndex = await indexSearch();

    await setCacheItem("searchIndex", searchIndex);
    return searchIndex;
  } else {
    return cacheItem.data;
  }
}

export async function getSearchIndexByWord(): Promise<{
  [key: string]: SearchItem[];
}> {
  const cacheItem = await getCacheItem("searchIndexByWord", "1HOUR");

  if (cacheItem.status.stale || true) {
    const searchIndex = await getSearchIndex();

    const searchIndexByWord: { [key: string]: SearchItem[] } = {};

    for (let item of searchIndex) {
      if (item.title == null) continue;

      const words = keywordSplit(item.title);

      for (let word of words) {
        if (searchIndexByWord[word] === undefined) {
          searchIndexByWord[word] = [];
        }
        searchIndexByWord[word].push(item);
      }
    }

    return searchIndexByWord;
  } else {
  }
}

export function keywordSplit(query: string) {
  const blocks = [];
  let currentBlock = "";

  for (let char of query) {
    if (char.match(/^[a-zA-Z0-9]*$/)) {
      currentBlock += char;
    } else {
      if (currentBlock !== "") {
        blocks.push(currentBlock.toLowerCase());
        currentBlock = "";
      }
    }
  }
  if (currentBlock !== "") {
    blocks.push(currentBlock.toLowerCase());
    currentBlock = "";
  }
  return blocks;
}

const filterAlphanumeric = (toFilter: string) => {
  return toFilter.replace(/[^0-9a-z]/gi, "");
};

const scoreWordMatch = (ref: string, sub: string) => {
  const refAna: { [x: string]: number } = {};

  ref.split("").forEach((ref) => {
    // sort words into object with quantities of letters
    refAna[ref] = (refAna[ref] || 0) + 1;
  });

  const subAna: { [x: string]: number } = {};

  sub.split("").forEach((sub) => {
    // sort words into object with quantities of letters
    subAna[sub] = (subAna[sub] || 0) + 1;
  });

  let missing: string[] = []; // chars in ref not in sub
  let stray: string[] = []; // chars in sub not in ref

  Object.keys(refAna).forEach((ref) => {
    // add missing chars to missing
    const quantity = refAna[ref] || 0;
    const subQuantity = subAna[ref] || 0;
    if (quantity > subQuantity) {
      missing = missing.concat(Array(quantity - subQuantity).fill(ref));
    }
  });

  Object.keys(subAna).forEach((sub) => {
    // add stray chars to stray
    const quantity = refAna[sub] || 0;
    const subQuantity = subAna[sub] || 0;
    if (subQuantity > quantity) {
      stray = stray.concat(Array(subQuantity - quantity).fill(sub));
    }
  });

  // calculate score
  let score =
    Math.min(
      (ref.length -
        (missing.length + stray.length * 0.5) +
        (ref.includes(sub) || sub.includes(ref) ? 2 : 0)) /
        ref.length,
      1
    ) * /*Math.min(ref.length, sub.length)*/ ref.length;

  return score;
};

export async function search(
  query: string,
  items: number
): Promise<SearchItem[]> {
  if (query.length < 2) {
    const courses: Course[] = await getCourses();

    return courses
      .filter((course: Course) => {
        return course.name.toLowerCase().includes(query.toLowerCase());
      })
      .sort((a: Course, b: Course) => {
        return (
          a.name.toLowerCase().indexOf(query.toLowerCase()) -
          b.name.toLowerCase().indexOf(query.toLowerCase())
        );
      })
      .slice(0, items)
      .map((course: Course): SearchItem => {
        return {
          title: course.name,
          url: `/courses/${course.id}`,
          courseId: course.id,
          moduleId: [],
          isCourse: true,
        };
      });
  }

  const results: SearchItem[] = [];
  const scoredResults: {
    [url: string]: {
      score: number;
      item: SearchItem;
    };
  } = {};

  const searchIndex = await getSearchIndex();

  for (let searchItem of searchIndex) {
    const score = trigramSimilarity(query, searchItem.title);

    scoredResults[searchItem.url] = {
      score: score,
      item: searchItem,
    };
  }

  const courses = await getCourses();

  courses.forEach((course: Course) => {
    const courseScore = trigramSimilarity(query, course.name);

    scoredResults[course.name] = {
      score: courseScore,
      item: {
        title: course.name,
        url: `/courses/${course.id}`,
        courseId: course.id,
        moduleId: [],
      },
    };
  });

  const scoredResultsArray = Object.values(scoredResults);

  scoredResultsArray.sort((a, b) => {
    return b.score - a.score;
  });

  for (let scoredResult of scoredResultsArray) {
    results.push(scoredResult.item);
  }

  results.splice(items);

  return results;
}
