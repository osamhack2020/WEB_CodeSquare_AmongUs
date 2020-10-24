/** @jsx jsx */
import styled from "@emotion/styled";

export const Button = styled.button`
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
