/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export interface AvatarIconProps {
  width?: number;
  height?: number;
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
      width: ${width}px;
      height: ${height}px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #c4c4c4;
      background-image: url(${src});
      background-size: ${width}px ${height}px;
      background-repeat: no-repeat;
      background-origin: 50% 50%;
      background-position: center;
    `}
    {...props}
  />
);
