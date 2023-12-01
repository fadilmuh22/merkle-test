import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosClient = axios.create();

export const apiRequest = async <T, K = unknown>(
  url: string,
  method: "post" | "put" | "patch" | "get" | "delete",
  body?: K,
  internal = false
): Promise<T> => {
  try {
    const response = await axiosClient({
      method,
      data: body,
      url: (internal ? "/api" : API_BASE_URL) + url,
    });
    return response.data as T;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e;
    }
    return Promise.reject();
  }
};
