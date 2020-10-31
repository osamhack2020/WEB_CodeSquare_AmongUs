/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import { Button } from "../common/Button";
import { RadioInput } from "../common/RadioInput";
import { TagInput } from "../common/TagInput";
import { MarkdownEditor } from "../write/MarkdownEditor";
import { MarkdownRender } from "../write/MarkdownRender";

export interface QnaWriteFormProps {
  formTitle: string;
  title?: string;
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  onTextChange: (value: string) => void;
  tags?: string[];
  onTagChange?: (tags: string[]) => void;
  reply?: boolean;
  onSubmit: () => void;
  submitType: "등록" | "수정";
}

export const QnaWriteForm: React.FC<QnaWriteFormProps> = ({
  formTitle,
  title,
  onTitleChange,
  text,
  onTextChange,
  tags,
  onTagChange,
  reply,
  onSubmit,
  submitType,
  ...props
}) => {
  const [preview, setPreview] = useState(false);
  return (
    <div
      css={css`
        width: 600px;
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
        {formTitle}
      </div>
      {!reply && (
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
            placeholder="제목"
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
      )}
      {!preview && (
        <MarkdownEditor
          text={text}
          onChange={onTextChange}
          height={240}
          css={css`
            margin-bottom: 12px;
          `}
        />
      )}
      {preview && (
        <MarkdownRender
          text={text}
          css={css`
            margin-bottom: 12px;
            min-height: 300px;
            padding: 13px 15px;
            border: 1px solid #dbdbdb;
            border-radius: 8px;
          `}
        />
      )}
      <RadioInput
        checked={preview}
        onClick={() => setPreview((val) => !val)}
        css={css`
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 19px;
          letter-spacing: -0.02em;
          text-align: left;
          margin-bottom: ${reply ? 40 : 28}px;
        `}
      >
        미리보기
      </RadioInput>
      {!reply && (
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
          <TagInput tags={tags!} onChange={onTagChange!} />
        </div>
      )}
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
          {submitType}
        </Button>
      </div>
    </div>
  );
};
QnaWriteForm.defaultProps = {
  tags: [],
  onTagChange: () => {},
};
