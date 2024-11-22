import Axios from "axios";

export const BaseUrl = "https://wt.pool2jibi.com/";

export const apiAgent = Axios.create({ baseURL: BaseUrl });

apiAgent.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
