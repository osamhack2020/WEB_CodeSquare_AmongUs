/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useCallback } from "react";
import useInput from "../../lib/hooks/useInput";
import { LoginInput } from "./LoginInputForm";

const LoginFormBlock = styled.div`
  display: flex;
  width: 450px;
`;

export interface LoginForm {
  onSubmit: (id: string, password: string) => void;
}

export const LoginForm: React.FC<LoginForm> = ({
  onSubmit: submit,
  ...props
}) => {
  const [username, onChangeUsername] = useInput("");
  const [password, onChangePassword] = useInput("");
  const onSubmit = useCallback(() => {
    submit(username, password);
  }, [submit, username, password]);

  return (
    <LoginFormBlock {...props}>
      <LoginInput label="아이디" value={username} onChange={onChangeUsername} />
      <LoginInput
        label="비밀번호"
        value={password}
        onChange={onChangePassword}
        onSubmit={onSubmit}
        password
      />
    </LoginFormBlock>
  );
};
