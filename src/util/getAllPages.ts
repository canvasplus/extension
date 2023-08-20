import axios from "redaxios";

const PER_PAGE = 100;

async function requestPage(url: string, page: number): Promise<any> {
  try {
    const { data } = await axios.get(
      url + `&page=${page}&per_page=${PER_PAGE}`
    );

    if (data.length < PER_PAGE) {
      return data;
    }

    const nextData = await requestPage(url, page + 1);

    return [...data, ...nextData];
  } catch (error) {
    console.log(error);
  }
}
export default function getAllPages(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    requestPage(url, 1)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
