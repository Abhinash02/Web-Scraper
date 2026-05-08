import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getStoriesRequest = async (page = 1, limit = 15) => {
  const { data } = await API.get(`/stories?page=${page}&limit=${limit}`);
  return data;
};

export const toggleBookmarkRequest = async (storyId, token) => {
  const { data } = await API.post(
    `/stories/${storyId}/bookmark`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getBookmarksRequest = async (token) => {
  const { data } = await API.get("/stories/bookmarks/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};