/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { OutlineButton } from "../../components/common/OutlineButton";
import { RadioButtons } from "../../components/common/RadioButtons";
import { RadioInput } from "../../components/common/RadioInput";
import { WrapperLink } from "../../components/common/WrapperLink";
import { QnaListWidget } from "../../components/qna/QnaListWidget";
import { MarkdownEditor } from "../../components/write/MarkdownEditor";
import { QnaPost } from "../../lib/api/qna";
import qna from "../../modules/qna";
import usePost from "./hooks/usePost";
import { QnaPostViewer } from "./QnaPostViewer";

const recentCompare = (a: QnaPost, b: QnaPost) => {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
};

const recommendCompare = (a: QnaPost, b: QnaPost) => {
  return b.recommend - a.recommend;
};

export const QnaPostContainer: React.FC = () => {
  const history = useHistory();
  const onClick = useCallback(
    (postId: number) => {
      history.push(`/qna/post/${postId}`);
    },
    [history],
  );
  const onWriteClick = useCallback(() => {
    history.push("/qna/write");
  }, [history]);
  const [sortOrder, setSortOrder] = useState("recommend");
  const onChangeSortOrder = useCallback(
    (order: string) => {
      setSortOrder(order);
    },
    [setSortOrder],
  );
  const [preview, setPreview] = useState(false);
  const onClickPreview = useCallback(() => setPreview((preview) => !preview), [
    setPreview,
  ]);
  const { postId }: { postId: string } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(qna.actions.setPostId(Number(postId)));
  }, [postId, dispatch]);
  const { data, loading } = usePost(postId);
  useEffect(() => {
    if (data) {
      dispatch(qna.actions.setAuthor(data?.post.username));
    }
  }, [data, dispatch]);
  const [text, setText] = useState("");
  const onTextChange = useCallback(
    (text: string) => {
      setText(text);
    },
    [setText],
  );
  const accepted = data?.replies.some((repl) => repl.accepted);
  return (
    <div
      css={css`
        max-width: 1100px;
        margin: 0 auto;
        padding-left: 24px;
        padding-right: 24px;
        padding-top: 48px;
        display: flex;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        `}
      >
        {loading && <div>Loading...</div>}
        {!loading && data && <QnaPostViewer post={data.post} />}
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            padding-bottom: 36px;
          `}
        >
          <div
            css={css`
              font-size: 24px;
              font-style: normal;
              font-weight: 700;
              line-height: 35px;
              letter-spacing: -0.02em;
              text-align: left;
              margin-left: 52px;
            `}
          >
            <span
              css={css`
                color: #627bff;
              `}
            >
              {data?.replies.length || 0}개
            </span>
            의 답변이 있습니다.
          </div>
          <RadioButtons
            value={sortOrder}
            values={["recommend", "recent"]}
            labels={["추천순", "최신순"]}
            onChange={onChangeSortOrder}
          />
        </div>
        {!loading &&
          data &&
          data.replies
            .sort((sortOrder === "recent" && recentCompare) || recommendCompare)
            .map((repl) => (
              <QnaPostViewer key={repl.id} accepted={accepted} post={repl} />
            ))}
        <div
          css={css`
            margin-left: 52px;
            padding-bottom: 32px;
          `}
        >
          <div
            css={css`
              font-size: 18px;
              font-style: normal;
              font-weight: 400;
              line-height: 26px;
              letter-spacing: -0.02em;
              text-align: left;
              padding-bottom: 12px;
            `}
          >
            답변 등록하기
          </div>
          <MarkdownEditor
            text={text}
            onChange={onTextChange}
            height={153}
            css={css`
              margin-bottom: 12px;
            `}
          />
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <RadioInput
              checked={preview}
              onClick={onClickPreview}
              css={css`
                font-size: 13px;
                font-style: normal;
                font-weight: 400;
                line-height: 19px;
                letter-spacing: -0.02em;
                text-align: left;
              `}
            >
              미리보기
            </RadioInput>
            <Button
              css={css`
                padding: 7px 45px;
                border-radius: 6px;
                font-size: 14px;
                font-style: normal;
                font-weight: 700;
                line-height: 20px;
                letter-spacing: -0.02em;
                text-align: center;
              `}
            >
              등록
            </Button>
          </div>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            margin-left: 52px;
            padding: 32px 0px;
            padding-bottom: 78px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <div
              css={css`
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 26px;
                letter-spacing: -0.02em;
                text-align: left;
              `}
            >
              찾고 있는 질문이 없나요?
            </div>
            <div
              css={css`
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
                letter-spacing: -0.02em;
                text-align: left;
              `}
            >
              코드 스퀘어의 전우들에게 물어보세요.
            </div>
          </div>
          <OutlineButton
            css={css`
              padding: 12px 24px;
            `}
            onClick={onWriteClick}
          >
            질문 등록하기
          </OutlineButton>
        </div>
      </div>
      <div
        css={css`
          flex: 1 0 190px;
          margin-top: 52px;
          margin-left: 40px;
          & > div:not(:last-child) {
            padding-bottom: 28px;
          }
        `}
      >
        <OutlineButton
          css={css`
            margin-bottom: 34px;
            width: 100%;
            height: 28px;
            border-radius: 6px;
          `}
        >
          <WrapperLink to="/qna/write">
            <div
              css={css`
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 17px;
                letter-spacing: -0.02em;
                text-align: center;
              `}
            >
              새로운 질문하기
            </div>
          </WrapperLink>
        </OutlineButton>
        <QnaListWidget
          onClick={onClick}
          title="답변을 기다리는 질문"
          posts={[
            { title: "빅 오(Big O) 계산은 어떻게 하나요?", id: 1 },
            { title: "숫자 맞추기 게임 관련 질문", id: 2 },
            { title: "자바 writeUTF 인코딩", id: 3 },
            { title: "파이썬 질문 급해요 ㅜㅜ", id: 4 },
            { title: "예외가 throw됨: 읽기 액세스 위반...", id: 5 },
            {
              title:
                "빅 오 숫자 질문 throw됨: 계산은 인코딩 위반 관련 하나요? 숫자 급해요 예외가 ㅜㅜ",
              id: 6,
            },
          ]}
        />
        <QnaListWidget
          onClick={onClick}
          title="최근 인기 질문"
          posts={[
            { title: "빅 오(Big O) 계산은 어떻게 하나요?", id: 1 },
            { title: "숫자 맞추기 게임 관련 질문", id: 2 },
            { title: "자바 writeUTF 인코딩", id: 3 },
            { title: "파이썬 질문 급해요 ㅜㅜ", id: 4 },
            { title: "예외가 throw됨: 읽기 액세스 위반...", id: 5 },
            {
              title:
                "빅 오 숫자 질문 throw됨: 계산은 인코딩 위반 관련 하나요? 숫자 급해요 예외가 ㅜㅜ",
              id: 6,
            },
          ]}
        />
      </div>
    </div>
  );
};
