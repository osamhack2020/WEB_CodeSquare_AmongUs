/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const LoginInputBlock = styled.form`
  display: flex;
  flex-direction: column;
`;

export interface LoginInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onSubmit?: (value: string) => void;
  password?: boolean;
  disabled?: boolean;
  label: string;
}

export const LoginInput: React.FC<LoginInputProps> = ({
  onChange,
  onSubmit,
  value,
  label,
  password = false,
  disabled = false,
  ...props
}) => {
  return (
    <LoginInputBlock
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit(value);
      }}
    >
      <div>{label}</div>
      <input
        type={password ? "password" : "text"}
        value={value}
        onChange={onChange}
        {...props}
      ></input>
    </LoginInputBlock>
  );
};
