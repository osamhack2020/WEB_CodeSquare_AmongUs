import apiClient from "./apiClient";

export interface LoginResponse {
  /** 로그인 성공 시 'success' */
  response: string;
  /** 로그인 메시지 */
  message: string;
  /** accessToken */
  data: string;
}

export const login = async (
  username: string,
  password: string,
): Promise<boolean> => {
  try {
    const response = await apiClient.post<LoginResponse>("/user/signin", {
      username,
      password,
    });
    const { data } = response;
    if (!data || data.response !== "success") {
      return false;
    }
    // accessToken을 Authorization 헤더 기본값으로 설정
    apiClient.defaults.headers.common["Authorization"] = response.data.data;

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const logout = async () => {
  await apiClient.post("/user/signout");
  // Authorization 헤더 제거
  delete apiClient.defaults.headers.common["Authorization"];
};
