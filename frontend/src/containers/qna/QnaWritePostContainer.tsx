/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { TagInput } from "../../components/common/TagInput";
import { MarkdownEditor } from "../../components/write/MarkdownEditor";
import { editPost, getPost, writePost } from "../../lib/api/qna";
import useInput from "../../lib/hooks/useInput";
import { useQuery } from "../../lib/hooks/useQuery";

export const QnaWritePostContainer: React.FC = ({ ...props }) => {
  const history = useHistory();
  const edit = useQuery().get("id");
  const [title, onTitleChange, resetTitle] = useInput("");
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");
  const loadPost = useCallback(async () => {
    if (!edit) {
      return;
    }
    const post = await getPost(edit);
    resetTitle(post.title);
    setTags(post.tags || []);
    setText(post.text);
  }, [edit, resetTitle, setTags, setText]);
  useEffect(() => {
    loadPost();
  }, [edit, loadPost]);
  const onSubmit = useCallback(async () => {
    if (edit) {
      const post = await editPost(text, title, tags);
      history.push(`/qna/post/${post.id}`);
      return;
    }
    const post = await writePost(text, title, tags);
    history.push(`/qna/post/${post.id}`);
  }, [history, text, title, tags, edit]);
  return (
    <div
      css={css`
        width: 600px;
        margin: 0 auto;
        padding-top: 74px;
      `}
      {...props}
    >
      <div
        css={css`
          font-size: 30px;
          font-style: normal;
          font-weight: 400;
          line-height: 43px;
          letter-spacing: -0.02em;
          text-align: left;
          color: #323232;

          padding-bottom: 28px;
        `}
      >
        {!edit && "질문 등록하기"}
        {edit && "질문 수정하기"}
      </div>
      <div
        css={css`
          padding-bottom: 28px;
        `}
      >
        <div
          css={css`
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 23px;
            letter-spacing: -0.02em;
            padding-bottom: 8px;

            color: #2c2b2b;
          `}
        >
          질문 제목
        </div>
        <input
          placeholder="질문 제목"
          css={css`
            border: 1px solid #e3e3e3;
            height: 36px;
            padding: 10px 15px;
            border-radius: 4px;
            width: 100%;
            :disabled {
              color: #959da5;
              background-color: #f3f4f6;
            }
          `}
          value={title}
          onChange={onTitleChange}
        />
      </div>
      <MarkdownEditor
        text={text}
        onChange={setText}
        height={240}
        css={css`
          margin-bottom: 28px;
        `}
      />
      <div
        css={css`
          padding-bottom: 40px;
        `}
      >
        <div
          css={css`
            padding-bottom: 8px;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 23px;
            letter-spacing: -0.02em;

            color: #2c2b2b;
          `}
        >
          태그
        </div>
        <TagInput tags={tags} onChange={setTags} />
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Button
          onClick={onSubmit}
          css={css`
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px;
            letter-spacing: -0.02em;
            text-align: center;
            color: white;
            padding: 7px 45px;
          `}
        >
          {!edit && "등록"}
          {edit && "수정"}
        </Button>
      </div>
    </div>
  );
};
