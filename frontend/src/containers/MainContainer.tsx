/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/common/Button";

export const MainContainer: React.FC = () => {
  const history = useHistory();
  const onClick = useCallback(() => {
    history.push("/register");
  }, [history]);
  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      <div
        css={css`
          height: 100%;
          padding-left: 180px;
          padding-top: 128px;
          display: flex;
          flex-direction: column;

          background: url(clip-programming.png);
          background-repeat: no-repeat;
          background-position: 441px 120px;
          background-size: 1041px 694px;
        `}
      >
        <div
          css={css`
            font-size: 48px;
            font-style: normal;
            font-weight: 700;
            line-height: 60px;
            letter-spacing: -0.02em;
            text-align: left;
          `}
        >
          군 복무 중에도,
          <br />
          개발은 계속되어야 하니까
        </div>
        <div
          css={css`
            font-size: 18px;
            font-style: normal;
            font-weight: 300;
            line-height: 26px;
            letter-spacing: -0.02em;
            text-align: left;

            padding-top: 25px;
          `}
        >
          당신의 개발이 멈추지 않도록
          <br />
          CodeSquare가 여러분과 함께합니다.
        </div>
        <Button
          onClick={onClick}
          css={css`
            width: 192px;
            height: 52px;
            margin-top: 60px;
          `}
        >
          <div
            css={css`
              font-size: 18px;
              font-style: normal;
              font-weight: 700;
              line-height: 26px;
              letter-spacing: -0.02em;
              text-align: left;
            `}
          >
            시작하기
          </div>
        </Button>
      </div>
      <div
        css={css`
          height: 120px;
          background: #f2f2f2;
          position: absolute;
          width: 100%;
          bottom: 0;
          z-index: -1;
          height: 144px;
        `}
      />
    </div>
  );
};
