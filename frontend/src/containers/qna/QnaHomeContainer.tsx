/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button } from "../../components/common/Button";

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
  );
};
