import axios from "axios";

export const BASE_URL = "https://todo.api.devcode.gethired.id/";

export const api = axios.create({
  timeout: 325000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  baseURL: BASE_URL,
});
