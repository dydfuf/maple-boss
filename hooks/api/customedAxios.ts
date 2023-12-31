import axios from "axios";
import { API_HOST } from "constants/common";

export const customedAxios = axios.create({
  baseURL: "/proxy",
});

export const customedSSRAxios = axios.create({
  baseURL: API_HOST,
});
