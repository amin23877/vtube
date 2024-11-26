/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiAgent } from "./config";

export async function get(path: string, config?: AxiosRequestConfig<any>) {
  const onSuccess = (response: AxiosResponse<any, any>) => {
    return response.data;
  };

  const onError = (error: any) => {
    return Promise.reject(error?.response);
  };

  try {
    const response = await apiAgent.get(path, config);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}
export async function post(
  path: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) {
  const onSuccess = (response: AxiosResponse<any, any>) => {
    return response.data;
  };

  const onError = (error: any) => {
    return Promise.reject(error.response);
  };

  try {
    const response = await apiAgent.post(path, data, config);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}
export async function delete_(path: string, config?: AxiosRequestConfig<any>) {
  const onSuccess = (response: AxiosResponse<any, any>) => {
    return response.data;
  };

  const onError = (error: any) => {
    return Promise.reject(error.response);
  };

  try {
    const response = await apiAgent.delete(path, config);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}
