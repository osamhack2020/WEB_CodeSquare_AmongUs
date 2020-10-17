/** @jsx jsx */
import { css, jsx } from "@emotion/core";

interface VerticalDividerProps {
  height: number;
}

export const VerticalDivider: React.FC<VerticalDividerProps> = ({
  height,
  ...props
}) => (
  <svg
    css={css`
      width: 1px;
      height: ${height}px;
      fill: black;

      rect {
        width: 1px;
        height: ${height}px;
      }
    `}
    {...props}
  >
    <rect />
  </svg>
);
