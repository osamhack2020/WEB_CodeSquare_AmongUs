/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button } from "../../components/common/Button";
import { Sticky } from "../../components/common/Sticky";
import { QnaSideBar } from "../../components/qna/QnaSideBar";
import { QnaRecentPosts } from "./QnaRecentPosts";

export const QnaHomeContainer: React.FC = (props) => {
  return (
    <div
      css={css`
        max-width: 1100px;
        margin: 0 auto;
        padding-left: 24px;
        padding-right: 24px;
        padding-top: 83px;
      `}
      {...props}
    >
      <div>
        <div
          css={css`
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: 48px;
            letter-spacing: -0.02em;
            text-align: left;

            padding-bottom: 24px;
          `}
        >
          혼자 고민하지 말고,
          <br />
          전우에게 물어보세요
        </div>
        <div
          css={css`
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 26px;
            letter-spacing: -0.02em;
            text-align: left;

            padding-bottom: 40px;
          `}
        >
          해결되지 않는 문제가 있나요?
          <br />
          코드스퀘어의 전우들에게 물어보세요.
        </div>
        <Button
          css={css`
            height: 42px;
            width: 116px;
            border-radius: 6px;
          `}
        >
          질문하기
        </Button>
      </div>
      <div
        css={css`
          display: flex;
          padding-top: 120px;
        `}
      >
        <div
          css={css`
            width: 200px;
          `}
        >
          <Sticky top={120}>
            <QnaSideBar />
          </Sticky>
        </div>
        <div
          css={css`
            padding-left: 16px;
            flex: 1 1 0%;
          `}
        >
          <input
            css={css`
              width: 100%;
              height: 38px;
              background: #ffffff;
              border: 1px solid #b4b4b4;
              box-sizing: border-box;
              border-radius: 6px;
              padding: 16px 9px;

              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
              letter-spacing: -0.02em;
              text-align: left;
            `}
            placeholder="질문 검색"
          />
          <QnaRecentPosts
            css={css`
              padding-top: 38px;
            `}
          />
        </div>
      </div>
    </div>
  );
};
