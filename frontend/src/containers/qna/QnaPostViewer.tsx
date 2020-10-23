/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AvatarIcon } from "../../components/common/AvatarIcon";
import { ButtonWrapper } from "../../components/common/ButtonWrapper";
import { VerticalDivider } from "../../components/common/VerticalDivider";
import { QnaTagList } from "../../components/qna/QnaTagList";
import { Vote } from "../../components/qna/Vote";
import { accept, PostType, QnaPost, writeComment } from "../../lib/api/qna";
import { formatDate, numberWithCommas } from "../../lib/utils";
import { RootState } from "../../modules";
import { User } from "../../modules/core";
import qna from "../../modules/qna";
import useComments from "./hooks/useComments";
import { QnaComments } from "./QnaComments";

interface CommonIconProps {
  disabled?: boolean;
}

const AcceptIcon: React.FC<CommonIconProps> = ({ disabled }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.94.94a1.5 1.5 0 012.142 2.1l-7.984 9.98a1.5 1.5 0 01-2.16.04L.648 7.768a1.5 1.5 0 112.12-2.12l4.188 4.186 6.946-8.85a.465.465 0 01.04-.044h-.002z"
      fill={disabled ? "#c4c4c4" : "#627BFF"}
    />
  </svg>
);

const PencilIcon: React.FC<CommonIconProps> = ({ disabled }) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.896 6.976l-7.908 7.908-.518 1.764 1.729-.5 7.934-7.934-1.237-1.238zm1.349-1.35l1.237 1.238 1.154-1.154a.437.437 0 000-.618l-.62-.619a.437.437 0 00-.619 0l-1.151 1.153h-.001zm3.01-2.39l.618.618a2.188 2.188 0 010 3.094L7.117 17.704l-3.692 1.067a.875.875 0 01-1.083-1.085l1.092-3.723L14.162 3.235a2.187 2.187 0 013.093 0z"
      fill={disabled ? "#b4b4b4" : "#627bff"}
    />
  </svg>
);

const TrashIcon: React.FC<CommonIconProps> = ({ disabled }) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.594 4.594l.82 13.125c.039.758.59 1.312 1.313 1.312h7.546c.725 0 1.267-.554 1.313-1.312l.82-13.125"
      stroke={disabled ? "#b4b4b4" : "#627bff"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.281 4.594H17.72"
      stroke={disabled ? "#b4b4b4" : "#627bff"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M7.875 4.594v-1.64a.982.982 0 01.984-.985h3.282a.982.982 0 01.984.984v1.64M10.5 7.219v9.187M7.547 7.219l.328 9.187M13.453 7.219l-.328 9.187"
      stroke={disabled ? "#b4b4b4" : "#627bff"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface PostHeaderProps {
  member_name: string;
  username: string;
  title?: string;
  answer?: boolean;
  views?: number;
  created_at: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  answer,
  username,
  member_name,
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
      <AvatarIcon alt={username} width={32} height={32} />
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
          {member_name}
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
          <AvatarIcon width={16} height={16} alt={username} />
          <div>{member_name}</div>
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

export interface QnaPostViewerProps {
  post: QnaPost;
  accepted?: boolean;
}

export const QnaPostViewer: React.FC<QnaPostViewerProps> = ({
  post,
  accepted,
  ...props
}) => {
  const user = useSelector<RootState, User | null>((state) => state.core.user);
  const postType: PostType = post.answer ? "replies" : "board";
  const { loading, data: comments } = useComments(postType, post.id);
  const onSubmit = useCallback(
    async (text: string) => {
      await writeComment(postType, post.id, text);
    },
    [post.id, postType],
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const onAcceptClick = useCallback(async () => {
    await accept(post.id);
    dispatch(qna.actions.acceptReply(post.id));
  }, [post.id, dispatch]);
  const onEditClick = useCallback(() => {
    history.push(`/qna/write?id=${post.id}`);
  }, [history, post.id]);
  const onDeleteClick = useCallback(async () => {}, []);
  return (
    <div
      css={css`
        display: flex;
        padding: 36px 0;
      `}
      {...props}
    >
      <div
        css={css`
          width: 20px;
          margin-top: 16px;

          & > div {
            margin-bottom: 12px;
          }
        `}
      >
        <Vote
          votes={32}
          css={css`
            margin-bottom: 20px;
          `}
        />
        {post.accepted && (
          <div>
            <AcceptIcon />
          </div>
        )}
        {user && user.username === post.username && (
          <React.Fragment>
            {postType === "replies" && !accepted && !post.accepted && (
              <ButtonWrapper onClick={onAcceptClick}>
                <AcceptIcon disabled />
              </ButtonWrapper>
            )}
            <ButtonWrapper onClick={onEditClick}>
              <PencilIcon disabled />
            </ButtonWrapper>
            <ButtonWrapper onClick={onDeleteClick}>
              <TrashIcon disabled />
            </ButtonWrapper>
          </React.Fragment>
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
          username="@seowook12"
          member_name="서욱"
          created_at="2020-10-17 14:27"
          title="안드로이드 스튜디오 블루투스 질문"
          views={11379}
          answer={post.answer}
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
        {loading && <div>loading</div>}
        {!loading && comments && (
          <QnaComments onSubmit={onSubmit} comments={comments} />
        )}
      </div>
    </div>
  );
};
