/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AvatarIcon } from "../../components/common/AvatarIcon";
import { ButtonWrapper } from "../../components/common/ButtonWrapper";
import {
  AcceptIcon,
  PencilIcon,
  TrashIcon,
} from "../../components/common/Icon";
import { VerticalDivider } from "../../components/common/VerticalDivider";
import { QnaAcceptPopper } from "../../components/qna/QnaAcceptPopper";
import { QnaTagList } from "../../components/qna/QnaTagList";
import { Vote } from "../../components/qna/Vote";
import {
  accept,
  deletePost,
  PostType,
  QnaPost,
  writeComment,
} from "../../lib/api/qna";
import { formatDate, numberWithCommas } from "../../lib/utils";
import { RootState } from "../../modules";
import { User } from "../../modules/core";
import qna from "../../modules/qna";
import useComments from "./hooks/useComments";
import { QnaComments } from "./QnaComments";

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
  popper?: boolean;
}

export const QnaPostViewer: React.FC<QnaPostViewerProps> = ({
  post,
  accepted,
  popper,
  ...props
}) => {
  const user = useSelector<RootState, User | null>((state) => state.core.user);
  const isAuthor =
    useSelector<RootState, string | undefined>(
      (state) => state.qna.post?.username,
    ) === user?.username;
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
    if (post.answer) {
      history.push(`/qna/edit?id=${post.id}&type=replies`);
    } else {
      history.push(`/qna/edit?id=${post.id}`);
    }
  }, [history, post.id, post.answer]);
  const onDeleteClick = useCallback(async () => {
    await deletePost(postType, post.id);
    if (postType === "board") {
      dispatch(qna.actions.setPost(null));
      history.goBack();
    } else if (postType === "replies") {
      dispatch(qna.actions.deleteReply(post.id));
    }
  }, [dispatch, history, post.id, postType]);
  const [acceptButtonRef, setAcceptButtonRef] = useState<HTMLDivElement | null>(
    null,
  );
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
        {postType === "replies" && isAuthor && !accepted && !post.accepted && (
          <React.Fragment>
            <ButtonWrapper ref={setAcceptButtonRef} onClick={onAcceptClick}>
              <AcceptIcon disabled />
            </ButtonWrapper>
            {!loading && (
              <QnaAcceptPopper anchorEl={acceptButtonRef} show={popper} />
            )}
          </React.Fragment>
        )}
        {user?.username === post.username && (
          <React.Fragment>
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
          username={post.username}
          member_name={post.member_name}
          created_at={post.created_at}
          title={post.title}
          views={post.view}
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
          {post.text}
        </div>
        {post.tags && (
          <QnaTagList
            css={css`
              padding-bottom: 26px;
            `}
          >
            {post.tags.map((tag) => (
              <div key={tag}>{tag}</div>
            ))}
          </QnaTagList>
        )}
        {loading && <div>loading</div>}
        {!loading && comments && (
          <QnaComments onSubmit={onSubmit} comments={comments} />
        )}
      </div>
    </div>
  );
};
