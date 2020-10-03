/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Button } from "../common/Button";
import { TextButton } from "../common/TextButton";
import useHeader from "./hooks/useHeader";
import { Link } from "react-router-dom";

const WrapperLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

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
  const { user, onLogout } = useHeader();
  return (
    <HeaderBlock {...props}>
      <WrapperLink to="/">
        <div
          css={css`
            font-size: 1.125rem;
            font-weight: 800;
          `}
        >
          CodeSquare
        </div>
      </WrapperLink>
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
          <TextButton label="로그아웃" onClick={onLogout} />
        </ButtonBlock>
      ) : (
        <ButtonBlock>
          <WrapperLink to="/login">
            <TextButton label="로그인" />
          </WrapperLink>
          <Button
            css={css`
              background: #c4c4c4;
            `}
            label="시작하기"
          />
        </ButtonBlock>
      )}
    </HeaderBlock>
  );
};
