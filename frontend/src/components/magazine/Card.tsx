/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { format } from "date-fns";

export const Card: React.FC<{
  src: string;
  title: string;
  source: string;
  created_at: string;
}> = ({ src, title, source, created_at, ...props }) => (
  <div
    css={css`
      width: 265px;
      display: inline-flex;
      flex-direction: column;
    `}
    {...props}
  >
    <div
      css={css`
        width: 265px;
        height: 188px;
        background-size: 265px 188px;
        background-image: url(${src});
        background-repeat: no-repeat;
      `}
    />
    <div
      css={css`
        padding: 18px;
        padding-top: 16px;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 26px;
          letter-spacing: -0.02em;
          text-align: left;
          text-overflow: ellipsis;
          word-break: break-word;
          overflow-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;

          color: #242627;

          height: 52px;
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
        `}
      >
        {title}
      </div>
      <div
        css={css`
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 17px;
          letter-spacing: -0.02em;

          color: #85898b;

          display: flex;
          flex-direction: column;
        `}
      >
        <div>{source}</div>
        <div>{format(new Date(created_at), "yyyy.MM.dd")}</div>
      </div>
    </div>
  </div>
);
