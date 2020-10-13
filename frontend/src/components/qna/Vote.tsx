/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const SvgBlock = styled.div`
  width: 20px;
  height: 20px;
`;

const UpVote = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 0l8.66 15H.34L9 0z" fill="#C4C4C4" />
  </svg>
);
const DownVote = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 15L.34 0h17.32L9 15z" fill="#C4C4C4" />
  </svg>
);

export interface VoteProps {
  votes: number;
}

export const Vote: React.FC<VoteProps> = ({ votes }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      width: 20px;
    `}
  >
    <UpVote />
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 8px;
        margin-bottom: 8px;

        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        text-align: center;
      `}
    >
      {votes}
    </div>
    <DownVote />
  </div>
);
