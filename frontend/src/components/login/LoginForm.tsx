/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import useInput from "../../lib/hooks/useInput";
import { Button } from "../common/Button";
import { LoginInput } from "./LoginInputForm";

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
  onSubmit: submit,
  onCancel,
  ...props
}) => {
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, onChangeUsername] = useInput("");
  const [password, onChangePassword] = useInput("");
  const onSubmit = useCallback(async () => {
    setLoading(true);
    const loggedIn = await submit(username, password);
    setLoading(false);
    setLoginFailed(!loggedIn);
  }, [submit, username, password, setLoading]);

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
        `}
      >
        다시 만나서 반가워요!
      </div>
      <LoginInput
        label="아이디"
        value={username}
        onChange={onChangeUsername}
        css={css`
          margin-bottom: 16px;
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
      />
      <div
        css={css`
          padding-top: 12px;
          font-family: Noto Sans KR;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 17px;
          letter-spacing: -0.02em;

          height: 17px;
          color: #fa2d2d;
        `}
      >
        {loginFailed &&
          "존재하지 않는 아이디거나, 비밀번호가 일치하지 않습니다."}
      </div>
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
        >
          <div
            css={css`
              font-size: 18px;
              font-style: normal;
              font-weight: 500;
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
        >
          <div
            css={css`
              font-size: 18px;
              font-style: normal;
              font-weight: 500;
              line-height: 26px;
              letter-spacing: -0.02em;
              text-align: center;
            `}
          >
            로그인
          </div>
        </Button>
      </div>
    </LoginFormBlock>
  );
};
