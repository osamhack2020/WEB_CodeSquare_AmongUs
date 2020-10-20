/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { QnaComment } from "../../lib/api/qna";
import { Divider } from "../common/Divider";
import { QnaCommentItem } from "./QnaCommentItem";

export interface QnaCommentListProps {
  comments: QnaComment[];
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
