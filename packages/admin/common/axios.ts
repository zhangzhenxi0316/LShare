import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
});
axiosInstance.interceptors.response.use((response) => {
  if (response.data.code === 500) {
    location.href = `${location.protocol}//${location.host}/login`;
  }
  return Promise.resolve(response);
  // }
});
export default axiosInstance;
