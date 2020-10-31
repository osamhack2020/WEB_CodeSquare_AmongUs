/** @jsx jsx */
import { css, jsx } from "@emotion/core";

interface VoteSvgProps {
  type: "upvote" | "downvote";
  enabled?: boolean;
}

const upvote = "M9 0l8.66 15H.34L9 0z";
const downvote = "M9 15L.34 0h17.32L9 15z";

const VoteIcon: React.FC<VoteSvgProps & React.HTMLProps<SVGElement>> = ({
  type,
  enabled,
}) => {
  let d = "";
  if (type === "downvote") {
    d = downvote;
  } else if (type === "upvote") {
    d = upvote;
  }
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={css`
        cursor: pointer;
      `}
    >
      <path d={d} fill={enabled ? "#627bff" : "#c4c4c4"} />
    </svg>
  );
};

export interface VoteProps {
  votes: number;
  upvoted?: boolean;
  downvoted?: boolean;
  onUpvote?: () => void;
  onDownvote?: () => void;
}

export const Vote: React.FC<VoteProps> = ({
  votes,
  upvoted,
  downvoted,
  onUpvote,
  onDownvote,
  ...props
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 20px;
      `}
      {...props}
    >
      <VoteIcon type="upvote" enabled={upvoted} onClick={onUpvote} />
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
      <VoteIcon type="downvote" enabled={downvoted} onClick={onDownvote} />
    </div>
  );
};
