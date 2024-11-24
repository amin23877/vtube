import Axios from "axios";

export const BaseUrl = process.env.NEXT_PUBLIC_HOST;

export const apiAgent = Axios.create({ baseURL: BaseUrl });

apiAgent.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
