/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { QnaWriteForm } from "../../components/qna/QnaWriteForm";
import { writePost } from "../../lib/api/qna";
import useInput from "../../lib/hooks/useInput";

export const QnaWriteContainer: React.FC = ({ ...props }) => {
  const history = useHistory();
  const [title, onTitleChange] = useInput("");
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");
  const onSubmit = useCallback(async () => {
    const post = await writePost(text, title, tags);
    history.push(`/qna/${post.id}`);
  }, [history, text, title, tags]);
  return (
    <QnaWriteForm
      formTitle="질문 등록하기"
      title={title}
      onTitleChange={onTitleChange}
      text={text}
      onTextChange={setText}
      tags={tags}
      onTagChange={setTags}
      onSubmit={onSubmit}
      submitType="등록"
      css={css`
        margin: 0 auto;
        padding-top: 74px;
      `}
    />
  );
};
