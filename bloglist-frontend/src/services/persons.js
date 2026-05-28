import axios from "axios";
import { getToken } from "./token";

const baseUrl = "/api/persons";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export default { getAll, create };
