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

export const modify = async (id, body) => {
  const response = await axios.put(`${baseUrl}/${id}`, body);
  return response.status;
};

export const remove = async (id) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
