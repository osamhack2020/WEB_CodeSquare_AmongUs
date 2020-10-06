/** @jsx jsx */
import { css, jsx } from "@emotion/core";

interface ProgressProps {
  percent: number;
}

export const Progress: React.FC<ProgressProps> = ({ percent, ...props }) => {
  return (
    <div
      css={css`
        width: 100%;
        display: inline-block;
      `}
      {...props}
    >
      <div
        css={css`
          display: inline-block;
          width: 100%;
        `}
      >
        <div
          css={css`
            position: relative;
            display: inline-block;
            width: 100%;
            overflow: hidden;
            vertical-align: middle;
            background-color: #eaeaea;
            border-radius: 4px;
          `}
        >
          <div
            css={css`
              position: relative;
              background-color: #627bff;
              border-radius: 100px;

              width: ${percent}%;
              height: 6px;
            `}
          ></div>
        </div>
      </div>
    </div>
  );
};
