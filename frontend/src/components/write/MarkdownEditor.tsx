/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "../common/atom-one-light.css";
import { useCallback, useState } from "react";
require("codemirror/mode/markdown/markdown");
require("codemirror/mode/jsx/jsx");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/rust/rust");
require("codemirror/mode/python/python");

export interface MarkdownEditorProps {
  height?: number;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  height,
  ...props
}) => {
  const [value, setValue] = useState("");
  const handleChange = useCallback(
    (_editor, _data, value) => {
      setValue(value);
    },
    [setValue],
  );
  return (
    <div
      css={css`
        border: 1px solid #dbdbdb;
        border-radius: 8px;
        .CodeMirror {
          height: ${height ? height : 300}px;
          min-height: 0;
          flex: 1;
          font-size: 13px;
          line-height: 19px;
          color: #2c2b2b;
          font-family: source-code-pro, Consolas, Menlo, Monaco, Consolas,
            "Courier New";
          cursor: text;
        }
        pre {
          word-wrap: break-word;
          white-space: pre-wrap;
          word-break: normal;
        }
      `}
      {...props}
    >
      <CodeMirror
        value={value}
        options={{
          mode: "markdown",
          theme: "one-light",
          lineNumbers: false,
          lineWrapping: true,
        }}
        onBeforeChange={handleChange}
        css={css`
          padding: 13px 15px;
        `}
      />
      <div
        css={css`
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 17px;
          letter-spacing: -0.02em;
          padding: 14px 15px;
          padding-top: 0;

          color: #8a8a8a;
        `}
      >
        마크다운(Markdown) 문법을 사용할 수 있어요.
      </div>
    </div>
  );
};
