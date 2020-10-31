/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback } from "react";
import { Button } from "../../components/common/Button";
import { ReactComponent as Background } from "./pixeltrue-web-design-1.svg";

export const VmHomeContainer: React.FC = () => {
  const onClick = useCallback(() => {}, []);
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
        `}
      >
        <div
          css={css`
            position: absolute;
            bottom: 56px;
            right: 128px;
            z-index: 1;
          `}
        >
          <Background />
        </div>
        <div
          css={css`
            font-size: 48px;
            font-style: normal;
            font-weight: 700;
            line-height: 60px;
            letter-spacing: -0.02em;
            text-align: left;
            width: 480px;
            z-index: 2;

            background: linear-gradient(
                97.27deg,
                #ff8484 4.54%,
                rgba(255, 255, 255, 0) 97.19%
              ),
              linear-gradient(0deg, #627bff, #627bff);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          웹 브라우저만 있으면
          <br />
          어디서든, 자유롭게.
        </div>
        <div
          css={css`
            font-size: 18px;
            font-style: normal;
            font-weight: 300;
            line-height: 26px;
            letter-spacing: -0.02em;
            text-align: left;
            z-index: 2;

            padding-top: 25px;
          `}
        >
          코드스퀘어에서 제공하는 Linux VM과 웹 IDE 덕분에
          <br />
          리눅스 터미널부터 Visual Studio Code까지,
          <br />
          이제 웹 브라우저만 있으면 개발도 문제 없습니다.
        </div>
        <Button
          onClick={onClick}
          css={css`
            width: 192px;
            height: 52px;
            margin-top: 60px;
            z-index: 2;
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
