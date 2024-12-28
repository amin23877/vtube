import Axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { sessionKey } from ".";

export const BaseUrl = process.env.NEXT_PUBLIC_HOST;

export const apiAgent = Axios.create({ baseURL: BaseUrl });

apiAgent.interceptors.request.use(
  async (config) => {
    const token = await getCookie(sessionKey);
    if (!config.headers.Authorization && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiAgent.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      deleteCookie(sessionKey);
      redirect(process.env.START_PATH || "/");
    }

    return Promise.reject(error);
  }
);
