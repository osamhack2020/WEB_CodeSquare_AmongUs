/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button } from "../../components/common/Button";
import { QnaPostItem } from "../../components/qna/QnaPostItem";
import { QnaPostList } from "../../components/qna/QnaPostList";
import { QnaSideBar } from "../../components/qna/QnaSideBar";
import { QnaPost } from "../../modules/qna";

const generatePosts = (num: number): QnaPost[] =>
  new Array(num).fill(null).map((_, idx) => ({
    id: idx + 1,
    user_id: "seowook1963",
    title: "안드로이드 블루투스 연결 질문",
    body:
      "앞이 날카로우나 방황하였으며, 남는 황금시대의 커다란 그리하였는가?\n피에 불어 용감하고 말이다. 청춘에서만 듣기만 앞이 많이 부패뿐이다. 노년에게서 커다란 것이다.보라, 군영과 영락과 하여도...앞이 날카로우나 방황하였으며, 남는 황금시대의 커다란 그리하였는가? 피에 불어 용감하고 말이다. 청춘에서만 듣기만 앞이 많이 부패뿐이다. 노년에게서 커다란 것이다.보라, 군영과 영락과 하여도...",
    tag: "안드로이드",
    view: 321,
    recommend: 14,
    created_at: new Date(),
    updated_at: new Date(),
  }));

export const QnaHomeContainer: React.FC = (props) => {
  return (
    <div
      css={css`
        max-width: 1100px;
        padding-left: 24px;
        padding-right: 24px;
      `}
      {...props}
    >
      <div>
        <div
          css={css`
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: 48px;
            letter-spacing: -0.02em;
            text-align: left;

            padding-bottom: 24px;
          `}
        >
          혼자 고민하지 말고,
          <br />
          전우에게 물어보세요
        </div>
        <div
          css={css`
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 26px;
            letter-spacing: -0.02em;
            text-align: left;

            padding-bottom: 40px;
          `}
        >
          해결되지 않는 문제가 있나요?
          <br />
          코드스퀘어의 전우들에게 물어보세요.
        </div>
        <Button
          css={css`
            height: 42px;
            width: 116px;
            border-radius: 6px;
          `}
        >
          질문하기
        </Button>
      </div>
      <div
        css={css`
          display: flex;
          padding-top: 120px;
        `}
      >
        <QnaSideBar
          css={css`
            width: 200px;
          `}
        />
        <div
          css={css`
            padding-left: 16px;
            flex: 1 1 0%;
          `}
        >
          <input
            css={css`
              width: 100%;
              height: 38px;
              background: #ffffff;
              border: 1px solid #b4b4b4;
              box-sizing: border-box;
              border-radius: 6px;
              padding: 16px 9px;

              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
              letter-spacing: -0.02em;
              text-align: left;
            `}
            placeholder="질문 검색"
          />
          <QnaPostList
            css={css`
              padding-top: 38px;
            `}
          >
            {generatePosts(3).map((post) => (
              <QnaPostItem key={post.id} post={post} />
            ))}
          </QnaPostList>
        </div>
      </div>
    </div>
  );
};
