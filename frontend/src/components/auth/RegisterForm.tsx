/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import useInput from "../../lib/hooks/useInput";
import { Button } from "../common/Button";
import { LoginInput } from "./LoginInput";

const RegisterFormBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface RegisterFormProps {
  onCancel: () => void;
  onSubmit: (username: string, password: string) => Promise<void>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onCancel,
  onSubmit,
  ...props
}) => {
  const [username, onChangeUsername, , validUsername] = useInput(
    "",
    (_, next) => {
      if (next.length < 5 || next.length > 20) {
        return false;
      }
      return true;
    },
  );
  const [password, onChangePassword, , validPassword] = useInput("");
  const [password2, onChangePassword2] = useInput("");
  const validPassword2 = password === password2;

  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(async () => {
    if (validUsername && validPassword && validPassword2) {
      setLoading(true);
      await onSubmit(username, password);
      setLoading(false);
    }
  }, [
    onSubmit,
    username,
    password,
    validUsername,
    validPassword,
    validPassword2,
  ]);

  return (
    <RegisterFormBlock {...props}>
      <LoginInput
        label="아이디"
        value={username}
        onChange={onChangeUsername}
        disabled={loading}
        css={css`
          padding-top: 16px;
        `}
        hint={
          username.length > 0 &&
          validUsername === false &&
          "5~20자의 영문 소문자, 숫자만 사용이 가능해요."
        }
        invalid={!validUsername}
      />
      <LoginInput
        label="비밀번호"
        value={password}
        onChange={onChangePassword}
        password
        disabled={loading}
        hint={password.length > 0 && validPassword && "안전한 비밀번호에요!"}
        valid={validPassword}
        css={css`
          padding-top: 18px;
        `}
      />
      <LoginInput
        label="비밀번호 확인"
        value={password2}
        onChange={onChangePassword2}
        onSubmit={handleSubmit}
        password
        disabled={loading}
        hint={
          password2.length > 0 &&
          (validPassword2
            ? "비밀번호가 일치해요!"
            : "비밀전호가 일치하지 않아요.")
        }
        valid={validPassword2}
        invalid={!validPassword2}
        css={css`
          padding-top: 18px;
        `}
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
          onClick={handleSubmit}
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
            다음
          </div>
        </Button>
      </div>
    </RegisterFormBlock>
  );
};
