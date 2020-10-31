/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Logo } from "../common/Logo";

export const Footer: React.FC = () => (
  <div
    css={css`
      display: flex;
      padding: 37px 48px;
      background: #ebecee;
      align-items: center;
    `}
  >
    <Logo disabled />
    <div
      css={css`
        display: flex;
        padding-left: 30px;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 26px;
        letter-spacing: -0.02em;
        color: #464a5f;
        & > div:not(:last-child) {
          padding-right: 14px;
        }
      `}
    >
      <div>이용약관</div>
      <div>개인정보취급방침</div>
    </div>
    <div
      css={css`
        flex: 1 1 auto;
      `}
    />
    <div
      css={css`
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 26px;
        text-align: right;
        letter-spacing: -0.02em;

        color: #464a5f;
      `}
    >
      Copyright ⓒ 2020 CodeSquare
    </div>
  </div>
);
