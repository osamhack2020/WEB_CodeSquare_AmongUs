/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { AvatarIcon } from "../../components/common/AvatarIcon";
import { VerticalDivider } from "../../components/common/VerticalDivider";
import { QnaTagList } from "../../components/qna/QnaTagList";
import { Vote } from "../../components/qna/Vote";
import { formatDate, numberWithCommas } from "../../lib/utils";
import { QnaComments } from "./QnaComments";

export interface QnaPostViewerProps {
  answer?: boolean;
  accepted?: boolean;
}

interface PostHeaderProps {
  username: string;
  user_id: string;
  title?: string;
  answer?: boolean;
  views?: number;
  created_at: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  answer,
  user_id,
  username,
  title,
  views,
  created_at,
  ...props
}) => {
  return answer ? (
    <div
      css={css`
        display: flex;
      `}
      {...props}
    >
      <AvatarIcon alt={user_id} width={32} height={32} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding-left: 11px;
        `}
      >
        <div
          css={css`
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 16px;
            letter-spacing: -0.02em;
            text-align: left;
          `}
        >
          {username}
        </div>
        <div
          css={css`
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
            letter-spacing: -0.02em;
            text-align: left;
          `}
        >
          {formatDate(created_at)}
        </div>
      </div>
    </div>
  ) : (
    <React.Fragment>
      <div
        css={css`
          font-size: 30px;
          font-style: normal;
          font-weight: 400;
          line-height: 43px;
          letter-spacing: -0.02em;
          text-align: left;
          padding-bottom: 9px;

          color: #323232;
        `}
      >
        {title}
      </div>
      <div
        css={css`
          display: flex;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 17px;
          letter-spacing: -0.02em;
          text-align: left;
          align-items: center;
          padding-bottom: 20px;

          & > *:not(:last-child) {
            margin-right: 10px;
          }
          & > div {
            color: #5a5a5a;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            color: #3e3e3e;
            font-weight: 600;
          `}
        >
          <AvatarIcon width={16} height={16} alt={user_id} />
          <div>{username}</div>
        </div>
        <VerticalDivider
          height={8}
          css={css`
            align-self: center;
            fill: #c4c4c4;
          `}
        />
        <div>{formatDate(created_at)}</div>
        <VerticalDivider
          height={8}
          css={css`
            align-self: center;
            fill: #c4c4c4;
          `}
        />
        {views && <div>{`조회수: ${numberWithCommas(views)}`}</div>}
      </div>
    </React.Fragment>
  );
};

export const QnaPostViewer: React.FC<QnaPostViewerProps> = ({
  answer,
  accepted,
  ...props
}) => {
  return (
    <div
      css={css`
        display: flex;
      `}
      {...props}
    >
      <div
        css={css`
          width: 20px;
          margin-top: 16px;
        `}
      >
        <Vote
          votes={32}
          css={css`
            margin-bottom: 20px;
          `}
        />
        {accepted && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 17 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.94.94a1.5 1.5 0 012.142 2.1l-7.984 9.98a1.5 1.5 0 01-2.16.04L.648 7.768a1.5 1.5 0 112.12-2.12l4.188 4.186 6.946-8.85a.465.465 0 01.04-.044h-.002z"
              fill="#627BFF"
            />
          </svg>
        )}
      </div>
      <div
        css={css`
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          margin-left: 32px;
        `}
      >
        <PostHeader
          user_id="@seowook12"
          username="서욱"
          created_at="2020-10-17 14:27"
          title="안드로이드 스튜디오 블루투스 질문"
          views={11379}
          answer={answer}
        />
        <div
          css={css`
            padding-top: 20px;
            padding-bottom: 40px;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 0em;
            text-align: left;
          `}
        >
          같으며, 보이는 이성은 노년에게서 동력은 것이다. 그들의 위하여 공자는
          눈에 열매를 가진 청춘이 속에 천고에 부패뿐이다. 우리 수 창공에 듣기만
          별과 천하를 피어나기 말이다. 설레는 크고 청춘을 옷을 커다란 듣기만
          눈이 그들의 천하를 운다. 끝에 찾아 인간의 있는 청춘의 싹이 이상의
          청춘의 이것이다. 인생에 없는 예가 피부가 천하를 원대하고, 가진 사랑의
          보는 이것이다. 할지니, 너의 우리의 희망의 많이 것이다.
        </div>
        <QnaTagList
          css={css`
            padding-bottom: 26px;
          `}
        >
          <div>안드로이드</div>
          <div>Kotlin</div>
        </QnaTagList>
        <QnaComments />
      </div>
    </div>
  );
};
