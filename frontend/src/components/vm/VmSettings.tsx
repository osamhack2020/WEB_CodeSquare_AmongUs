/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { OutlineButton } from "../common/OutlineButton";

export interface VmSettingsProps {}

export const VmSettings: React.FC<VmSettingsProps> = () => {
  return (
    <div
      css={css`
        width: 100%;
        min-width: 170px;
      `}
    >
      <div
        css={css`
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 26px;
          letter-spacing: -0.02em;

          padding-bottom: 17px;

          color: #323232;
        `}
      >
        개발 환경 설정
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          border: 1px solid #e3e3e3;
          border-radius: 4px;
          padding: 20px 24px;

          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.02em;

          color: #323232;
        `}
      >
        <div
          css={css`
            flex-basis: 33.3%;
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              font-style: normal;
              font-weight: bold;
              font-size: 14px;
              line-height: 20px;
              letter-spacing: -0.02em;

              color: #323232;

              padding-bottom: 1px;
            `}
          >
            개발 환경 삭제
          </div>
          <div
            css={css`
              font-style: normal;
              font-weight: normal;
              font-size: 13px;
              line-height: 19px;
              letter-spacing: -0.02em;

              color: #323232;
            `}
          >
            개발 환경을 삭제하면 복구할 수 없습니다.
          </div>
        </div>
        <OutlineButton
          css={css`
            border: 1px solid #fa2d2d;
            border-radius: 6px;
            padding: 6px 24px;

            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            letter-spacing: -0.02em;

            color: #fa2d2d;
          `}
        >
          삭제하기
        </OutlineButton>
      </div>
    </div>
  );
};
