/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button } from "./Button";

export type OutlineButtonProps = {
  color?: string;
};

export const OutlineButton: React.FC<
  OutlineButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = ({ color, ...props }) => (
  <Button
    css={css`
      background: none;
      color: ${color ? color : "#627bff"};
      border: 1px solid ${color ? color : "#627bff"};
    `}
    {...props}
  ></Button>
);
