import axios from "axios";

const isProduction = import.meta.env.PROD;
export const axiosInstance = axios.create({
  baseURL: isProduction
    ? import.meta.env.VITE_PRODUCTION_URL
    : import.meta.env.VITE_DEVELOPMENT_URL,
});

const axiosAPI = async ({ method, url, data, config = {} }) => {
  const res = await axiosInstance({
    method,
    url,
    data,
    ...config,
  });
  return res.data;
};

export default axiosAPI;
