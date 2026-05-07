import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const registerRequest = async (payload) => {
  const { data } = await API.post("/auth/register", payload);
  return data;
};

export const loginRequest = async (payload) => {
  const { data } = await API.post("/auth/login", payload);
  return data;
};

export const getMeRequest = async (token) => {
  const { data } = await API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};