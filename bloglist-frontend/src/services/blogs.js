import axios from "axios";
import { getToken } from "./token";
const baseUrl = "/api/blogs";

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const create = async (newBlog) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};
