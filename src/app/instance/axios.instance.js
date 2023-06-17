import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  async function (error) {
    console.log(error);
    if (error.status === 401) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);
