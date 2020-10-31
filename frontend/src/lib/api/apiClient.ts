import axios from "axios";

const host =
  process.env.NODE_ENV === "development"
    ? "/"
    : // 빌드 시 설정된 REACT_APP_API_HOST 환경 변수 값으로 변경됩니다.
      process.env.REACT_APP_API_HOST || "/";
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
