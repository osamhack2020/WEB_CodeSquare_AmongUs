/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { TextButton } from "../../components/common/TextButton";
import { QnaCommentList } from "../../components/qna/QnaCommentList";
import { Comment } from "../../modules/qna";

const generateComments = (num: number): Comment[] =>
  new Array(num).fill(null).map((_, idx) => {
    return {
      id: idx + 1,
      user: {
        id: idx + 1,
        username: "홍길동",
      },
      text:
        "보이는 이성은 노년에게서 동력은 것이다. 열락의 꽃 구할 못할 것이다.",
      created_at: new Date().toString(),
      isAuthor: (idx + 1) % 2 === 0,
    };
  });

export const QnaComments: React.FC = () => {
  const comments = generateComments(5);
  return (
    <div>
      <QnaCommentList
        comments={comments}
        css={css`
          padding-bottom: 7px;
        `}
      />
      <div
        css={css`
          display: flex;
          width: 100%;
          justify-content: flex-end;
        `}
      >
        <TextButton
          css={css`
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 17px;
            letter-spacing: -0.02em;
            text-align: right;
            padding: 0;

            color: #747474;
          `}
        >
          새로운 댓글 달기
        </TextButton>
      </div>
    </div>
  );
};
