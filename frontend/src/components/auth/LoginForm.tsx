/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../../lib/hooks/useInput";
import { Button } from "../common/Button";
import { LoginInput } from "./LoginInput";

const WrapperLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const LoginFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
`;

export interface LoginForm {
  onSubmit: (id: string, password: string) => Promise<boolean>;
  onCancel: () => void;
}

export const LoginForm: React.FC<LoginForm> = ({
  onSubmit: login,
  onCancel,
  ...props
}) => {
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, onChangeUsername] = useInput("");
  const [password, onChangePassword] = useInput("");
  const onSubmit = useCallback(async () => {
    setLoading(true);
    const loggedIn = await login(username, password);
    setLoading(false);
    setLoginFailed(!loggedIn);
  }, [login, username, password, setLoading]);

  return (
    <LoginFormBlock {...props}>
      <div
        css={css`
          text-align: center;
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
        다시 만나서 반가워요!
      </div>
      <LoginInput
        label="아이디"
        value={username}
        onChange={onChangeUsername}
        css={css`
          margin-bottom: 4px;
        `}
        disabled={loading}
      />
      <LoginInput
        label="비밀번호"
        value={password}
        onChange={onChangePassword}
        onSubmit={onSubmit}
        password
        disabled={loading}
        hint={
          loginFailed &&
          "존재하지 않는 아이디거나, 비밀번호가 일치하지 않습니다."
        }
        invalid={loginFailed}
      />
      <div
        css={css`
          display: flex;
          margin-top: 36px;
        `}
      >
        <Button
          onClick={onCancel}
          css={css`
            background: #c4c4c4;
            color: black;
            border-radius: 4px;
            width: 100%;
            height: 45px;
            margin-right: 16px;
          `}
          disabled={loading}
        >
          <div
            css={css`
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              line-height: 26px;
              letter-spacing: -0.02em;
              text-align: center;
            `}
          >
            취소
          </div>
        </Button>
        <Button
          onClick={onSubmit}
          css={css`
            border-radius: 4px;
            height: 45px;
            width: 100%;
          `}
          disabled={loading}
        >
          <div
            css={css`
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              line-height: 26px;
              letter-spacing: -0.02em;
              text-align: center;
            `}
          >
            로그인
          </div>
        </Button>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 27px;
        `}
      >
        <div
          css={css`
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 17px;
            text-align: center;
            letter-spacing: -0.02em;

            color: #676767;
          `}
        >
          코드스퀘어가 처음이신가요?
        </div>
        <WrapperLink to="/register">
          <div
            css={css`
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 17px;
              text-align: center;
              letter-spacing: -0.02em;
              text-decoration-line: underline;

              color: #676767;
            `}
          >
            회원가입
          </div>
        </WrapperLink>
      </div>
    </LoginFormBlock>
  );
};
