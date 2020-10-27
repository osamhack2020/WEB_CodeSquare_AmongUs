/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components/base/Header";
import { logout } from "../../lib/api/auth";
import { RootState } from "../../modules";
import core from "../../modules/core";

export const HeaderContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.core.user);

  const onLogout = useCallback(async () => {
    await logout();
    dispatch(core.actions.setUser(null));
    window.location.href = "/";
  }, [dispatch]);
  return <Header user={user} onLogout={onLogout} />;
};
