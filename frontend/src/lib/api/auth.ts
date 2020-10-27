import { RegisterFormInput } from "../../components/auth/RegisterForm";
import apiClient from "./apiClient";

export interface LoginResponse {
  /** 로그인 성공 시 'success' */
  response: string;
  /** 로그인 메시지 */
  message: string;
  /** accessToken */
  data: string;
}

export const register = async ({
  username,
  password,
  member_group,
  member_name,
  member_rank,
  dog_tags,
}: RegisterFormInput) => {
  const response = await apiClient.post<LoginResponse>("/user/signup", {
    username,
    password,
    member_group,
    member_name,
    member_rank,
    dog_tags,
  });
  // accessToken을 Authorization 헤더 기본값으로 설정
  apiClient.defaults.headers.common["Authorization"] = response.data.data;
};

export const login = async (username: string, password: string) => {
  const response = await apiClient.post<LoginResponse>("/user/signin", {
    username,
    password,
  });
  // accessToken을 Authorization 헤더 기본값으로 설정
  apiClient.defaults.headers.common["Authorization"] = response.data.data;
};

export const logout = async () => {
  await apiClient.post("/user/signout");
  // Authorization 헤더 제거
  delete apiClient.defaults.headers.common["Authorization"];
};
