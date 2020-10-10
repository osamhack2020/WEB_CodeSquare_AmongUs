/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export const ProfileContainer: React.FC = () => {
  return (
    <div>
      <div
        css={css`
          height: 240px;

          background: linear-gradient(0deg, #ebe4e4, #ebe4e4), #c4c4c4;
        `}
      />
    </div>
  );
};
