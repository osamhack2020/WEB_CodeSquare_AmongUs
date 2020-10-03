/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Button } from "../common/Button";
import { TextButton } from "../common/TextButton";
import useHeader from "./hooks/useHeader";

const HeaderBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: #2c2b2b;
  color: white;
  padding: 14px 40px;
  align-items: center;
`;

const ButtonBlock = styled.div`
  display: flex;
  font-size: 1rem;
`;

export const Header: React.FC = ({ ...props }) => {
  const { user, onLoginClick, onLogout } = useHeader();
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
      {user ? (
        <ButtonBlock>
          <TextButton label="로그인" onClick={onLoginClick} />
          <Button
            css={css`
              background: #c4c4c4;
            `}
            label="시작하기"
          />
        </ButtonBlock>
      ) : (
        <ButtonBlock>
          <TextButton label="로그아웃" onClick={onLogout} />
        </ButtonBlock>
      )}
    </HeaderBlock>
  );
};
