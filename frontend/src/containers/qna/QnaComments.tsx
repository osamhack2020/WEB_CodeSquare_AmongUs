/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components/common/Button";
import { Divider } from "../../components/common/Divider";
import { TextButton } from "../../components/common/TextButton";
import { QnaCommentList } from "../../components/qna/QnaCommentList";
import { QnaComment } from "../../lib/api/qna";
import useInput from "../../lib/hooks/useInput";
import { RootState } from "../../modules";

export interface QnaCommentsProps {
  comments: QnaComment[];
  onSubmit: (text: string) => Promise<void>;
}

export const QnaComments: React.FC<QnaCommentsProps> = ({
  onSubmit: submit,
  comments: _comments,
  ...props
}) => {
  const author = useSelector<RootState>((state) => state.qna.author);
  const [comments, setComments] = useState<QnaComment[]>(_comments);
  // 댓글 id가 질문자 id와 일치할 경우 is_author를 true로 함
  useEffect(() => {
    setComments((comments) =>
      comments.map((comment) => ({
        ...comment,
        is_author: comment.username === author,
      })),
    );
  }, [author, setComments]);
  const [inputMode, setInputMode] = useState(false);
  const onNewCommentClick = useCallback(() => setInputMode(true), [
    setInputMode,
  ]);
  const [value, onChange, reset] = useInput("");
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!value) {
        return;
      }
      await submit(value);
      reset();
    },
    [value, reset, submit],
  );
  return (
    <div {...props}>
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
        {inputMode ? (
          <React.Fragment>
            <form
              css={css`
                display: flex;
                width: 100%;
              `}
              onSubmit={onSubmit}
            >
              <input
                value={value}
                onChange={onChange}
                placeholder="댓글을 입력하세요"
                css={css`
                  border: 0;
                  flex: 1 1 auto;
                  padding: 0;
                  :focus {
                    outline: 0;
                  }
                `}
              />
              <Button
                css={css`
                  font-size: 13px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 19px;
                  letter-spacing: -0.02em;
                  text-align: center;
                `}
              >
                등록
              </Button>
            </form>
            <Divider />
          </React.Fragment>
        ) : (
          <TextButton
            onClick={onNewCommentClick}
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
        )}
      </div>
    </div>
  );
};
