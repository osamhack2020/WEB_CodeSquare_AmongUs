/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button, ButtonProps } from "./Button";

export type OutlineButtonProps = ButtonProps & {
  color?: string;
};

export const OutlineButton: React.FC<OutlineButtonProps> = ({
  color,
  ...props
}) => (
  <Button
    css={css`
      background: none;
      color: ${color ? color : "#627bff"};
      border: 1px solid ${color ? color : "#627bff"};
    `}
    {...props}
  ></Button>
);
