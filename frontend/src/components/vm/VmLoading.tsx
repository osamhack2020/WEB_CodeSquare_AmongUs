/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export const VmLoading: React.FC = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
    `}
  >
    <div
      css={css`
        width: 100px;
        height: 100px;
        background-size: 100px 100px;
        background-repeat: no-repeat;
        background-image: url(vm-loading-1.gif);
      `}
    />
    <div
      css={css`
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 60px;
        text-align: center;
        letter-spacing: -0.02em;

        color: #242627;
        padding-bottom: 12px;
      `}
    >
      잠시만 기다려주세요.
    </div>
    <div
      css={css`
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        letter-spacing: -0.02em;

        color: #878686;
      `}
    >
      VM을 생성하는 중입니다.
    </div>
  </div>
);
