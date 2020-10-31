import axios from "axios";

const host =
  process.env.NODE_ENV === "development"
    ? "/"
    : "https://api.codesquare.space" || "/";
const apiClient = axios.create({
  baseURL: host,
  withCredentials: true,
});
apiClient.interceptors.response.use((response) => {
  if (response.data?.response === "failed") {
    return Promise.reject(response);
  }
  return response;
});

export default apiClient;
