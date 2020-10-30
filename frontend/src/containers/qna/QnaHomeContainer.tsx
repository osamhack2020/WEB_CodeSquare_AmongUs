/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ArrowButton } from "../../components/common/ArrowButton";
import { Sticky } from "../../components/common/Sticky";
import { QnaListWidget } from "../../components/qna/QnaListWidget";
import { QnaSideBar } from "../../components/qna/QnaSideBar";
import { QnaRecentPosts } from "./QnaRecentPosts";

export const QnaHomeContainer: React.FC = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
      {...props}
    >
      <div
        css={css`
          display: flex;
          background: #f7f8fa;
          justify-content: center;
          padding-top: 32px;
          padding-bottom: 14.13px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-right: 200px;
          `}
        >
          <div
            css={css`
              font-style: normal;
              font-weight: bold;
              font-size: 36px;
              line-height: 48px;
              letter-spacing: -0.02em;

              color: #323232;
              display: flex;
              flex-direction: column;
              padding-bottom: 22px;
            `}
          >
            <div>혼자 고민하지 말고,</div>
            <div>전우들에게 물어보세요</div>
          </div>
          <div
            css={css`
              font-style: normal;
              font-weight: normal;
              font-size: 18px;
              line-height: 26px;
              letter-spacing: -0.02em;

              color: #686868;
              display: flex;
              flex-direction: column;
              padding-bottom: 31px;
            `}
          >
            <div>해결되지 않는 문제가 있나요?</div>
            <div>CodeSquare의 전우들에게 물어보세요.</div>
          </div>
          <ArrowButton to="/qna/write">질문하기</ArrowButton>
        </div>
        <div
          css={css`
            width: 554.77px;
            height: 364.87px;
            background-image: url(qna-1.png);
            background-repeat: no-repeat;
            background-size: 554.77px 364.87px;
          `}
        />
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          padding-top: 61px;
        `}
      >
        <div
          css={css`
            width: 120px;
            margin-right: 70px;
          `}
        >
          <Sticky top={120}>
            <QnaSideBar />
          </Sticky>
        </div>
        <QnaRecentPosts
          css={css`
            width: 710px;
            padding-right: 50px;
          `}
        />
        <div
          css={css`
            width: 190px;
            & > div:not(:last-child) {
              padding-bottom: 28px;
            }
          `}
        >
          <QnaListWidget
            title="답변을 기다리는 질문"
            posts={[
              { title: "빅 오(Big O) 계산은 어떻게 하나요?", id: 1 },
              { title: "숫자 맞추기 게임 관련 질문", id: 2 },
              { title: "자바 writeUTF 인코딩", id: 3 },
              { title: "파이썬 질문 급해요 ㅜㅜ", id: 4 },
              { title: "예외가 throw됨: 읽기 액세스 위반...", id: 5 },
              {
                title:
                  "빅 오 숫자 질문 throw됨: 계산은 인코딩 위반 관련 하나요? 숫자 급해요 예외가 ㅜㅜ",
                id: 6,
              },
            ]}
          />
          <QnaListWidget
            title="최근 인기 질문"
            posts={[
              { title: "빅 오(Big O) 계산은 어떻게 하나요?", id: 1 },
              { title: "숫자 맞추기 게임 관련 질문", id: 2 },
              { title: "자바 writeUTF 인코딩", id: 3 },
              { title: "파이썬 질문 급해요 ㅜㅜ", id: 4 },
              { title: "예외가 throw됨: 읽기 액세스 위반...", id: 5 },
              {
                title:
                  "빅 오 숫자 질문 throw됨: 계산은 인코딩 위반 관련 하나요? 숫자 급해요 예외가 ㅜㅜ",
                id: 6,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
