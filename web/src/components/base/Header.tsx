/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Button } from "../common/Button";
import { TextButton } from "../common/TextButton";

const HeaderBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: #2c2b2b;
  color: white;
  padding: 16px 40px;
  align-items: center;
`;

export const Header: React.FC = ({ ...props }) => {
  return (
    <HeaderBlock {...props}>
      <div
        css={css`
          font-size: 1.125rem;
          font-weight: 800;
        `}
      >
        CodeSquare
      </div>
      <div
        css={css`
          display: flex;
          font-size: 1rem;
          div:not(:last-child) {
            margin-right: 36px;
          }
        `}
      >
        <div>개발하기</div>
        <div>Q&A</div>
        <div>매거진</div>
        <div>GitLab</div>
      </div>
      <div
        css={css`
          display: flex;
          font-size: 1rem;
        `}
      >
        <TextButton label="로그인" />
        <Button
          css={css`
            background: #c4c4c4;
          `}
          label="시작하기"
        />
      </div>
    </HeaderBlock>
  );
};
