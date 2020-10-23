/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { QnaWriteForm } from "../../components/qna/QnaWriteForm";
import { editPost, editReply } from "../../lib/api/qna";
import useInput from "../../lib/hooks/useInput";
import { useQuery } from "../../lib/hooks/useQuery";
import { RootState } from "../../modules";
import { QnaState } from "../../modules/qna";

export const QnaEditContainer: React.FC = ({ ...props }) => {
  const history = useHistory();
  const query = useQuery();
  const reply = query.get("type") === "replies";
  const postId = Number(query.get("id"));
  const [title, onTitleChange, resetTitle] = useInput("");
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");
  const qna = useSelector<RootState, QnaState>((state) => state.qna);
  useEffect(() => {
    if (reply) {
      if (!qna.replies || !postId) {
        history.push("/");
        return;
      }
      const post = qna.replies.find((reply) => reply.id === postId);
      if (!post) {
        history.push("/");
        return;
      }
      setText(post.text);
    } else {
      if (!qna.post || qna.post.id !== postId) {
        history.push("/");
        return;
      }
      resetTitle(qna.post.title);
      setText(qna.post.text);
      setTags(qna.post.tags || []);
    }
  }, [history, qna.post, qna.replies, postId, reply, resetTitle]);
  const onSubmit = useCallback(async () => {
    if (reply) {
      await editReply(postId, text);
      history.push(`/qna/post/${qna.post?.id}`);
    } else {
      await editPost(postId, text, title, tags);
      history.push(`/qna/post/${qna.post?.id}`);
    }
  }, [history, text, title, tags, postId, qna.post, reply]);
  return (
    <QnaWriteForm
      formTitle={`${reply ? "답변" : "질문"} 수정하기`}
      title={title}
      onTitleChange={onTitleChange}
      text={text}
      onTextChange={setText}
      tags={tags}
      onTagChange={setTags}
      onSubmit={onSubmit}
      submitType="수정"
      reply={reply}
      css={css`
        margin: 0 auto;
        padding-top: 74px;
      `}
      {...props}
    />
  );
};
