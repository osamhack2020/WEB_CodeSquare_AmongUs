/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export interface AvatarIconProps {
  width?: string | number;
  height?: string | number;
  alt: string;
  src?: string;
}

export const AvatarIcon: React.FC<AvatarIconProps> = ({
  width = 32,
  height = 32,
  src,
  alt,
  ...props
}) => (
  <div
    css={css`
      border-radius: 50%;
      background: #c4c4c4;
    `}
    style={{ width, height }}
    {...props}
  >
    <img
      src={src}
      alt={alt}
      css={css`
        display: block;
        text-indent: 100%;
        white-space: nowrap;
        overflow: hidden;
      `}
      style={{ width, height }}
    />
  </div>
);
