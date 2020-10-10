/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export interface QnaPostListProps {}

export const QnaPostList: React.FC = ({ children }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
    `}
  >
    {children}
  </div>
);
