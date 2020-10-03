import { useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../../../modules";

const login = async () => {};

const logout = async () => {};

export default function useHeader() {
  const user = useSelector((state: RootState) => state.core.user);

  const onLoginClick = useCallback(async () => {
    await login();
  }, []);

  const onLogout = useCallback(async () => {
    await logout();
    window.location.href = "/";
  }, []);

  return { user, onLoginClick, onLogout };
}
