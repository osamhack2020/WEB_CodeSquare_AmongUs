/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { HTMLProps } from "react";
import { QnaPost } from "../../modules/qna";
import { AvatarIcon } from "../common/AvatarIcon";
import { Divider } from "../common/Divider";
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
          alt={`@${post.user_id}`}
          css={css`
            margin-top: 4px;
          `}
          width="49px"
          height="49px"
        />
        <QnaPostContent>
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
          <QnaTagList
            css={css`
              padding-top: 16px;
            `}
          >
            <div>{post.tag}</div>
          </QnaTagList>
        </QnaPostContent>
      </QnaPostWrapper>
      <Divider />
    </QnaPostBlock>
  );
};
