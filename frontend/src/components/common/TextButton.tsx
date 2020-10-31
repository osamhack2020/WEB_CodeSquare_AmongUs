/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button } from "./Button";

export const TextButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props,
) => (
  <Button
    css={css`
      background: none;
      color: inherit;
    `}
    {...props}
  ></Button>
);
