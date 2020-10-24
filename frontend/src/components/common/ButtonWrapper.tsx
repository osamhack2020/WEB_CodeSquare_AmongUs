/** @jsx jsx */
import styled from "@emotion/styled";

export interface ButtonWrapperProps {
  onClick: () => void;
}

export const ButtonWrapper = styled.div`
  cursor: pointer;
`;
