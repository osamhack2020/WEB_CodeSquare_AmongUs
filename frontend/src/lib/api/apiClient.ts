import axios from "axios";

const host =
  process.env.NODE_ENV === "development"
    ? "/"
    : process.env.REACT_APP_API_HOST || "/";
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
if (process.env.NODE_ENV === "production") {
  apiClient.defaults.baseURL = "https://api.codesquare.space";
}

export default apiClient;
