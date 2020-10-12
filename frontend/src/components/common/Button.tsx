/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

export interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonBlock = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  color: white;
  background: #627bff;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 14px;
  user-select: none;
  &:disabled {
    cursor: not-allowed;
    color: #ffffff;
    background: #c4c4c4;
    &:hover {
      background: #c4c4c4;
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({ onClick, ...props }) => {
  return <ButtonBlock onClick={onClick} {...props} />;
};
