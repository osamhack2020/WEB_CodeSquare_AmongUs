/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import format from "date-fns/format";
import koLocale from "date-fns/locale/ko";

export interface VmInformationProps {
  created_at: string;
}

export const VmInformation: React.FC<VmInformationProps> = ({
  created_at,
  ...props
}) => {
  return (
    <div
      css={css`
        width: 100%;
        min-width: 170px;
      `}
      {...props}
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
        개발 환경 정보
      </div>
      <div
        css={css`
          display: flex;
          border: 1px solid #e3e3e3;
          box-sizing: border-box;
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
            font-weight: bold;

            & > div:not(:last-child) {
              padding-bottom: 9px;
            }
          `}
        >
          <div>생성일시</div>
          <div>프로세서</div>
          <div>메모리</div>
          <div>디스크</div>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;

            & > div:not(:last-child) {
              padding-bottom: 9px;
            }
          `}
        >
          <div>
            {format(new Date(created_at), "yyyy.MM.dd(E) HH:mm:ss", {
              locale: koLocale,
            })}
          </div>
          <div>1 코어</div>
          <div>512 MB</div>
          <div>10 GB</div>
        </div>
      </div>
    </div>
  );
};
