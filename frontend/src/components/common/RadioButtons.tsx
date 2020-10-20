/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback } from "react";

export interface RadioButtonsProps {
  values: string[];
  labels: string[];
  value: string;
  onChange: (value: string) => void;
}

export const RadioButtons: React.FC<RadioButtonsProps> = ({
  values,
  labels,
  value,
  onChange,
  ...props
}) => {
  const onClick = useCallback(
    (val: string) => () => {
      onChange(val);
    },
    [onChange],
  );
  return (
    <div
      css={css`
        display: flex;

        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 17px;
        letter-spacing: -0.02em;

        & > div {
          border: 1px solid #dbdbdb;
          border-radius: 4px;
          padding: 6.5px 20px;
          cursor: pointer;
        }
        & > div:not(:last-child) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        & > div:not(:first-of-type) {
          margin-left: -1px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      `}
      {...props}
    >
      {values.map((val, idx) => (
        <div
          key={val}
          onClick={onClick(val)}
          css={
            value === val &&
            css`
              background-color: #627bff;
              color: white;
              :not(:first-of-type) {
                border-left: 0;
                margin-left: 0;
              }
            `
          }
        >
          {labels[idx]}
        </div>
      ))}
    </div>
  );
};
