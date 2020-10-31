/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Link } from "react-router-dom";

export interface QnaListWidgetProps {
  title: string;
  posts: { title: string; id: number }[];
}

export const QnaListWidget: React.FC<QnaListWidgetProps> = ({
  title,
  posts,
  ...props
}) => {
  return (
    <div {...props}>
      <div
        css={css`
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.02em;

          color: #323232;
        `}
      >
        {title}
      </div>
      <div
        css={css`
          padding-top: 11px;
          display: flex;
          flex-direction: column;
          a {
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 17px;
            letter-spacing: -0.02em;
            text-align: left;
            text-overflow: ellipsis;
            word-break: break-word;
            overflow-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: #627bff;
            text-decoration: none;
          }
          a:not(:last-child) {
            margin-bottom: 4px;
          }
        `}
      >
        {posts.map((post) => (
          <Link to={`/qna/${post.id}`} key={post.id}>
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
