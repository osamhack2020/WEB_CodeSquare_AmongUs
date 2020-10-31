/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export interface QnaPostListProps {}

export const QnaPostList: React.FC = ({ children, ...props }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
    `}
    {...props}
  >
    {children}
  </div>
);
