import "server-only";
import { cache } from "react";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_TEST_TOKEN}`,
  },
};

const RAINDROP_API_URL = "https://api.raindrop.io/rest/v1";

export const getUser = cache(async () => {
  try {
    const response = await fetch(`${RAINDROP_API_URL}/user`, options);
    return await response.json();
  } catch (error) {
    console.info(error);
    return null;
  }
});

export const getCollections = cache(async () => {
  try {
    const response = await fetch(`${RAINDROP_API_URL}/collections`, options);
    const collections = await response.json();
    return collections;
  } catch (error) {
    console.info(error);
    return null;
  }
});

export const getChildCollections = cache(async () => {
  try {
    const response = await fetch(
      `${RAINDROP_API_URL}/collections/childrens`,
      options,
    );
    return await response.json();
  } catch (error) {
    console.info(error);
    return null;
  }
});

export const getBookmark = cache(async (id: number, pageIndex = "0") => {
  try {
    const response = await fetch(
      `${RAINDROP_API_URL}/raindrops/${id}?` +
        new URLSearchParams({
          page: pageIndex,
          perpage: "100",
        }),
      options,
    );
    return await response.json();
  } catch (error) {
    console.info(error);
    return null;
  }
});
