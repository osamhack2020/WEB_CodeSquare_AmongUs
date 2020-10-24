/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export interface ButtonWrapperProps {
  onClick: () => void;
}

export const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  children,
  onClick,
  ...props
}) => (
  <div
    onClick={onClick}
    css={css`
      cursor: pointer;
    `}
    {...props}
  >
    {children}
  </div>
);
