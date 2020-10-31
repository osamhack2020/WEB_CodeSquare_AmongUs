/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { HTMLProps, useCallback, useRef } from "react";
import useInput from "../../lib/hooks/useInput";

const CloseIcon: React.FC<HTMLProps<HTMLDivElement>> = (props) => (
  <div {...props}>
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.705 6.5l2.15-2.145a.502.502 0 10-.71-.71L6 5.795l-2.145-2.15a.502.502 0 00-.71.71L5.295 6.5l-2.15 2.145a.5.5 0 00.163.82.5.5 0 00.547-.11L6 7.205l2.145 2.15a.5.5 0 00.82-.163.5.5 0 00-.11-.547L6.705 6.5z"
        fill="#627BFF"
      />
    </svg>
  </div>
);

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onBoxClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const [value, onInputChange, reset] = useInput("");
  const onRemoveTag = useCallback(
    (tag: string) => () => {
      const idx = tags.indexOf(tag);
      if (idx !== -1) {
        tags.splice(idx, 1);
        onChange([...tags]);
      }
    },
    [onChange, tags],
  );
  const onKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 8) {
        if (!value) {
          e.preventDefault();
          const text = tags.pop();
          reset(text);
          onChange([...tags]);
        }
      }
      if (e.keyCode === 188 || e.keyCode === 32 || e.keyCode === 9) {
        if (e.keyCode === 188 || e.keyCode === 32) {
          e.preventDefault();
        }
        const tag = value.trim();
        if (tag && tags.indexOf(tag) === -1) {
          onChange([...tags, tag]);
          reset();
        }
      }
    },
    [onChange, tags, value, reset],
  );
  return (
    <div
      css={css`
        width: 100%;
        min-height: 42.5px;
        border: 1px solid #dbdbdb;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 9px 15px;
        display: inline-block;
        cursor: text;
      `}
      onClick={onBoxClick}
      {...props}
    >
      <ul
        css={css`
          list-style: none;
          display: inline;
          padding-left: 0;
        `}
      >
        {tags.map((tag) => (
          <li
            key={tag}
            css={css`
              display: inline-flex;
              padding: 2px 6px;
              margin-right: 5px;
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 17px;
              letter-spacing: -0.02em;

              background: #eff2ff;
              color: #627bff;
            `}
          >
            <div
              css={css`
                padding-right: 2px;
              `}
            >
              {tag}
            </div>
            <CloseIcon
              onClick={onRemoveTag(tag)}
              css={css`
                cursor: pointer;
                display: flex;
                align-items: center;
              `}
            />
          </li>
        ))}
      </ul>
      <input
        ref={inputRef}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onInputChange}
        css={css`
          width: 130px;
          padding: 0px;
          min-height: 21px;
          max-width: 100%;
          border: 0;
          outline: none;
        `}
      />
    </div>
  );
};
