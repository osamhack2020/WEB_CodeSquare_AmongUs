/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { Comment } from "../../modules/qna";
import { Divider } from "../common/Divider";
import { QnaCommentItem } from "./QnaCommentItem";

export interface QnaCommentListProps {
  comments: Comment[];
}

export const QnaCommentList: React.FC<QnaCommentListProps> = ({
  comments,
  ...props
}) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
    `}
    {...props}
  >
    <Divider />
    {comments.map((comment) => (
      <React.Fragment key={comment.id}>
        <QnaCommentItem comment={comment} />
        <Divider />
      </React.Fragment>
    ))}
  </div>
);
