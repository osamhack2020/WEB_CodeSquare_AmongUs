/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Comment } from "../../modules/qna";

export interface QnaCommentItemProps {
  comment: Comment;
}

export const QnaCommentItem: React.FC<QnaCommentItemProps> = ({
  comment,
  ...props
}) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      padding: 10px 0px;
    `}
    {...props}
  >
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        padding-bottom: 4px;
      `}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        <div
          css={css`
            font-size: 13px;
            font-style: normal;
            font-weight: 700;
            line-height: 19px;
            letter-spacing: -0.02em;
            text-align: left;
            padding-right: 6px;
          `}
        >
          {comment.user.username}
        </div>
        {comment.isAuthor && (
          <div
            css={css`
              align-self: center;
              padding: 1px 6px;
              border: 1px solid #627bff;
              box-sizing: border-box;
              border-radius: 10px;

              font-style: normal;
              font-weight: normal;
              font-size: 9px;
              line-height: 13px;
              letter-spacing: -0.02em;

              color: #627bff;
            `}
          >
            질문자
          </div>
        )}
      </div>
      <div
        css={css`
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 17px;
          letter-spacing: -0.02em;
          text-align: left;
        `}
      >
        {comment.created_at}
      </div>
    </div>
    <div
      css={css`
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 19px;
        text-align: left;
      `}
    >
      {comment.text}
    </div>
  </div>
);
