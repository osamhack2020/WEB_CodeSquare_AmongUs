/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export const QnaTagList: React.FC = ({ children, ...props }) => (
  <div
    css={css`
      display: flex;
      div {
        background: #e6e6e6;
        border-radius: 4px;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 17px;
        letter-spacing: -0.02em;
        padding: 2px 6px;
      }
      div:not(:last-child) {
        margin-right: 6px;
      }
    `}
    {...props}
  >
    {children}
  </div>
);
