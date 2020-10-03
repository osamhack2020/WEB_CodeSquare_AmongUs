/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button, ButtonProps } from "./Button";

export type TextButtonProps = ButtonProps;

export const TextButton: React.FC<TextButtonProps> = (props) => (
  <Button
    css={css`
      background: none;
      color: inherit;
    `}
    {...props}
  ></Button>
);
