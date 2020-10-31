/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ReactNode, useEffect, useState } from "react";
import unified from "unified";
import markdown from "remark-parse";
import slug from "remark-slug";
import remark2rehype from "remark-rehype";
import breaks from "remark-breaks";
import stringify from "rehype-stringify";
import raw from "rehype-raw";
import parseHtml from "html-react-parser";
import prismPlugin from "../../lib/remark/prismPlugin";
import { prismTheme } from "../../lib/themes/prism";

export interface MarkdownRenderProps {
  text: string;
  className?: string;
}

export const MarkdownRender: React.FC<MarkdownRenderProps> = ({
  text,
  className,
}) => {
  const [elem, setElem] = useState<ReactNode>(null);
  useEffect(() => {
    const html = unified()
      .use(markdown)
      .use(slug)
      .use(prismPlugin)
      .use(breaks)
      .use(remark2rehype, { allowDangerousHTML: true })
      .use(raw)
      .use(stringify)
      .processSync(text)
      .toString();

    setElem(parseHtml(html));
  }, [text]);
  return (
    <div
      className={className}
      css={css`
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
        color: #474747;

        ${prismTheme}

        p {
          white-space: pre-wrap;
        }

        p > code {
          background: #1d1f21;
          color: #c5c8c6;
          padding: 3px 6px;
        }

        pre {
          background: #1d1f21;
          padding: 13px 15px;
          border-radius: 6px;
          font-family: "Nanum Gothic Coding", source-code-pro, Menlo, Monaco,
            Consolas, "Courier New", monospace;
          font-size: 12px;
          line-height: 18px;
          overflow-x: auto;
          letter-spacing: 0px;
          white-space: pre-wrap;
        }

        h1,
        h2 {
          padding-bottom: 0;
          border-bottom: 0;
        }

        h1 {
          font-size: 28px;
          font-style: normal;
          font-weight: 700;
          line-height: 41px;
          letter-spacing: -0.02em;

          color: #323232;
          margin-bottom: 32px;
        }
        h2 {
          font-style: normal;
          font-weight: bold;
          font-size: 21px;
          line-height: 30px;
          letter-spacing: -0.02em;

          color: #323232;
          margin-bottom: 28px;
        }
        h3 {
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 26px;
          letter-spacing: -0.02em;

          color: #323232;
          margin-bottom: 24px;
        }
        p {
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 180%;
          letter-spacing: -0.02em;

          color: #525252;
          margin-bottom: 24px;
        }
      `}
    >
      {elem}
    </div>
  );
};
