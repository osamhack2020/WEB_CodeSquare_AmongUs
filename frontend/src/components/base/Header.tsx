/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { User } from "../../modules/core";
import { AvatarIcon } from "../common/AvatarIcon";
import { Logo } from "../common/Logo";
import { OutlineButton } from "../common/OutlineButton";
import { TextButton } from "../common/TextButton";
import { VerticalDivider } from "../common/VerticalDivider";
import { WrapperLink } from "../common/WrapperLink";

const HeaderBlock = styled.div`
  display: flex;
  width: 100%;
  flex-basis: 60px;
  height: 74px;
  justify-content: space-between;
  background-color: #ffffff;
  color: #454a4e;
  padding: 14px 40px;
  align-items: center;
`;

const ButtonBlock = styled.div`
  display: flex;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: -0.02em;
  text-align: left;
`;

export interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, ...props }) => {
  return (
    <HeaderBlock {...props}>
      <WrapperLink
        to="/"
        css={css`
          flex: 1 1 auto;
        `}
      >
        <Logo />
      </WrapperLink>
      <div
        css={css`
          display: flex;
          & > div {
            padding-right: 24px;
          }
        `}
      >
        <div
          css={css`
            align-self: center;
            display: flex;
            font-family: IBM Plex Sans;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 21px;
            letter-spacing: -0.02em;
            text-align: left;
            & > div:not(:last-child) {
              padding-right: 32px;
            }
          `}
        >
          <div>
            <WrapperLink to="/vm">IDE</WrapperLink>
          </div>
          <div>
            <WrapperLink to="/qna">Q&A</WrapperLink>
          </div>
          <div>
            <WrapperLink to="/magazine">Magazine</WrapperLink>
          </div>
          <div>
            <a
              href="https://git.codesquare.space/"
              css={css`
                display: block;
                color: inherit;
                text-decoration: none;
              `}
            >
              GitLab
            </a>
          </div>
        </div>
        <VerticalDivider
          height={10}
          css={css`
            align-self: center;
            margin-right: 24px;
          `}
        />
        <div>
          {user ? (
            <ButtonBlock>
              <TextButton
                onClick={onLogout}
                css={css`
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: 17px;
                  letter-spacing: -0.02em;
                  text-align: left;
                  padding: 0;
                  padding-right: 14px;
                `}
              >
                로그아웃
              </TextButton>
              <AvatarIcon width={32} height={32} alt={user.username} />
            </ButtonBlock>
          ) : (
            <ButtonBlock>
              <WrapperLink
                to="/login"
                css={css`
                  padding-right: 22px;
                  cursor: pointer;
                  align-self: center;
                `}
              >
                로그인
              </WrapperLink>
              <WrapperLink to="/register">
                <OutlineButton
                  css={css`
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 17px;
                    letter-spacing: 0em;
                    text-align: center;

                    padding: 8px 14px;
                    color: #6c63ff;
                    border-color: #6c63ff;
                  `}
                >
                  시작하기
                </OutlineButton>
              </WrapperLink>
            </ButtonBlock>
          )}
        </div>
      </div>
    </HeaderBlock>
  );
};
