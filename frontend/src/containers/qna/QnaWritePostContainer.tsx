/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback, useState } from "react";
import { Button } from "../../components/common/Button";
import { TagInput } from "../../components/common/TagInput";
import { MarkdownEditor } from "../../components/write/MarkdownEditor";
import useInput from "../../lib/hooks/useInput";

export const QnaWritePostContainer: React.FC = ({ ...props }) => {
  const [value, onChange] = useInput("");
  const [tags, setTags] = useState<string[]>([]);
  const onTagChange = useCallback(
    (tags: string[]) => {
      setTags(tags);
    },
    [setTags],
  );
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
        질문 등록하기
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
          value={value}
          onChange={onChange}
        />
      </div>
      <MarkdownEditor
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
        <TagInput tags={tags} onChange={onTagChange} />
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Button
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
          등록
        </Button>
      </div>
    </div>
  );
};
