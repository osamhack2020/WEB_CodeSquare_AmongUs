/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

export interface QnaSideBarProps {}

const Link = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.02em;
  text-align: left;

  padding-bottom: 12px;
`;

export const QnaSideBar: React.FC = (props) => (
  <div
    css={css`
      width: 130px;
    `}
    {...props}
  >
    <div>
      <Link>새로운 질문</Link>
      <Link>답변을 기다리는 질문</Link>
      <Link>나의 질문</Link>
    </div>
    <div
      css={css`
        padding-top: 48px;
      `}
    >
      <div
        css={css`
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 17px;
          letter-spacing: -0.02em;

          color: #6f6f6f;

          padding-bottom: 15px;
        `}
      >
        인기 태그
      </div>
      <Link>안드로이드</Link>
      <Link>Python</Link>
      <Link>Javascript</Link>
      <Link>React.js</Link>
      <Link>ReactNative</Link>
      <Link>Kotlin</Link>
    </div>
  </div>
);
