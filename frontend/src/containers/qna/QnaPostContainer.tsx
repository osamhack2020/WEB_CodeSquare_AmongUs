/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { OutlineButton } from "../../components/common/OutlineButton";
import { QnaListWidget } from "../../components/qna/QnaListWidget";
import { QnaPostViewer } from "./QnaPostViewer";

export const QnaPostContainer: React.FC = () => {
  const history = useHistory();
  const onClick = useCallback(
    (postId: number) => {
      history.push(`/qna/post/${postId}`);
    },
    [history],
  );
  return (
    <div
      css={css`
        max-width: 1100px;
        margin: 0 auto;
        padding-left: 24px;
        padding-right: 24px;
        padding-top: 83px;
        display: flex;
      `}
    >
      <QnaPostViewer
        css={css`
          flex: 1 1 auto;
        `}
      />
      <div
        css={css`
          flex: 1 0 190px;
          margin-top: 16px;
          margin-left: 40px;
          & > div:not(:last-child) {
            padding-bottom: 28px;
          }
        `}
      >
        <OutlineButton
          css={css`
            margin-bottom: 34px;
            width: 100%;
            height: 28px;
            border-radius: 6px;
          `}
        >
          <div
            css={css`
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 17px;
              letter-spacing: -0.02em;
              text-align: center;
            `}
          >
            새로운 질문하기
          </div>
        </OutlineButton>
        <QnaListWidget
          onClick={onClick}
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
          onClick={onClick}
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
  );
};
