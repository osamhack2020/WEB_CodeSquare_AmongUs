import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../../../modules";
import { logout } from "../../../lib/api/auth";
import core from "../../../modules/core";

export default function useHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.core.user);

  const onLogout = useCallback(async () => {
    await logout();
    dispatch(core.actions.setUser(null));
    window.location.href = "/";
  }, []);

  return { user, onLogout };
}
