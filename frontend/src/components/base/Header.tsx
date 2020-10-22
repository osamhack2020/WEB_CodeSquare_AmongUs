/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Button } from "../common/Button";
import { TextButton } from "../common/TextButton";
import { WrapperLink } from "../common/WrapperLink";
import useHeader from "./hooks/useHeader";

const HeaderBlock = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
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
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 60px;
          pointer-events: none;
        `}
      >
        <div
          css={css`
            height: 60px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: default;
            position: relative;
            pointer-events: none;
          `}
        >
          <div
            css={css`
              display: flex;
              font-size: 1rem;
              pointer-events: all;
              div:not(:last-child) {
                margin-right: 36px;
              }
            `}
          >
            <div>
              <WrapperLink to="/vm">개발하기</WrapperLink>
            </div>
            <div>
              <WrapperLink to="/qna">Q&A</WrapperLink>
            </div>
            <div>매거진</div>
            <div>GitLab</div>
          </div>
        </div>
      </div>
      {user ? (
        <ButtonBlock>
          <TextButton onClick={onLogout}>로그아웃</TextButton>
        </ButtonBlock>
      ) : (
        <ButtonBlock>
          <WrapperLink to="/login">
            <TextButton>로그인</TextButton>
          </WrapperLink>
          <WrapperLink to="/register">
            <Button>
              <div
                css={css`
                  font-weight: 700;
                `}
              >
                시작하기
              </div>
            </Button>
          </WrapperLink>
        </ButtonBlock>
      )}
    </HeaderBlock>
  );
};
