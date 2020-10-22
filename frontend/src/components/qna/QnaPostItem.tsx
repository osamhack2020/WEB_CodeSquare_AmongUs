/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { HTMLProps } from "react";
import { QnaPost } from "../../lib/api/qna";
import { formatDate } from "../../lib/utils";
import { AvatarIcon } from "../common/AvatarIcon";
import { Divider } from "../common/Divider";
import { WrapperLink } from "../common/WrapperLink";
import { QnaTagList } from "./QnaTagList";

export interface QnaPostItemProps {
  post: QnaPost;
}

const QnaPostBlock = styled.div`
  padding-bottom: 21px;
`;

const QnaPostWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 24px;
`;

const QnaPostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 18px;
`;

export const QnaPostItem: React.FC<
  QnaPostItemProps & HTMLProps<HTMLDivElement>
> = ({ post, ...props }) => {
  return (
    <QnaPostBlock {...props}>
      <QnaPostWrapper>
        <AvatarIcon
          alt={`@${post.username}`}
          css={css`
            margin-top: 4px;
          `}
          width="49px"
          height="49px"
        />
        <QnaPostContent>
          <WrapperLink to={`/qna/${post.id}`}>
            <div
              css={css`
                font-size: 21px;
                font-style: normal;
                font-weight: 400;
                line-height: 30px;
                letter-spacing: -0.02em;
                text-align: left;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;

                padding-bottom: 5px;
                color: #627bff;
                height: 30px;
              `}
            >
              {post.title}
            </div>
          </WrapperLink>
          <div
            css={css`
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
              letter-spacing: -0.02em;
              text-align: left;
              text-overflow: ellipsis;
              word-break: break-word;
              overflow-wrap: break-word;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;

              height: 40px;
            `}
          >
            {post.text}
          </div>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <QnaTagList
              css={css`
                padding-top: 16px;
              `}
            >
              {post.tags?.map((tag) => (
                <div key={tag}>{tag}</div>
              ))}
            </QnaTagList>
            <div
              css={css`
                align-self: flex-end;
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 17px;
                text-align: right;
                letter-spacing: -0.02em;

                color: #7c7c7c;
              `}
            >
              {formatDate(post.created_at)}
            </div>
          </div>
        </QnaPostContent>
      </QnaPostWrapper>
      <Divider />
    </QnaPostBlock>
  );
};
