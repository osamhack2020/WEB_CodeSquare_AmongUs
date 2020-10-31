/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ArrowIcon } from "./Icon";
import { OutlineButton } from "./OutlineButton";
import { WrapperLink } from "./WrapperLink";

export const ArrowButton: React.FC<{ to: string; color?: string }> = ({
  to,
  color,
  children,
  ...props
}) => (
  <OutlineButton
    css={css`
      color: ${color ? color : "#000000"};
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: -0.04em;
      text-align: left;

      display: flex;
      width: 181px;
      padding: 0;
      border: 1px solid ${color ? color : "#000000"};
      box-sizing: border-box;
      border-radius: 0px;
    `}
    {...props}
  >
    <WrapperLink
      to={to}
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 12px 17px;
      `}
    >
      {children}
      <ArrowIcon color={color} />
    </WrapperLink>
  </OutlineButton>
);
