/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoginForm, LoginFormInput } from "../../components/auth/LoginForm";
import { login } from "../../lib/api/auth";
import core from "../../modules/core";

export const LoginContainer: React.FC = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = useCallback(
    async ({ username, password }: LoginFormInput) => {
      await login(username, password);
      dispatch(core.actions.setUser({ username: "seowook12" }));
      history.push("/seowook12");
    },
    [dispatch, history],
  );
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);
  return (
    <LoginForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      css={css`
        margin: 0 auto;
      `}
      {...props}
    ></LoginForm>
  );
};
