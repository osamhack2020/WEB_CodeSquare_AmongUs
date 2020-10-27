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
          background: #f7f7f7;
          padding: 3px 6px;
        }

        pre {
          background: #f7f7f7;
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
      `}
    >
      {elem}
    </div>
  );
};
