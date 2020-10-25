/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  RegisterForm,
  RegisterFormInput,
} from "../../components/auth/RegisterForm";
import { register } from "../../lib/api/auth";
import core from "../../modules/core";

export const RegisterContainer: React.FC = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);
  const onSubmit = useCallback(
    async (data: RegisterFormInput) => {
      await register(data);
      dispatch(core.actions.setUser({ username: "seowook12" }));
      history.push("/seowook12");
    },
    [dispatch, history],
  );
  return (
    <div
      css={css`
        width: 450px;
        margin: 0 auto;
      `}
      {...props}
    >
      <div
        css={css`
          text-align: left;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 35px;
          letter-spacing: -0.02em;

          padding-top: 74px;
          padding-bottom: 53px;

          user-select: none;
        `}
      >
        <div>
          코드스퀘어 가입을
          <br />
          환영합니다 :)
        </div>
      </div>
      <RegisterForm onCancel={onCancel} onSubmit={onSubmit}></RegisterForm>
    </div>
  );
};
