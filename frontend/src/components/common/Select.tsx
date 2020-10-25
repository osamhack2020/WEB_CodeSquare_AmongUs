/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

interface Option {
  label: React.ReactNode;
  value: string | number;
}

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: Option[];
  name: string;
  disabled?: boolean;
  label: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, name, label, disabled = false }, ref) => {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
        className={className}
      >
        <label
          css={css`
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px;
            letter-spacing: -0.02em;
            text-align: left;
            padding-bottom: 6px;
          `}
        >
          {label}
        </label>
        <select
          name={name}
          disabled={disabled}
          ref={ref}
          css={css`
            border: 1px solid #e3e3e3;
            height: 36px;
            border-radius: 4px;
            padding-left: 4px;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.02em;
            color: #323232;

            :disabled {
              color: #959da5;
              background-color: #f3f4f6;
            }
          `}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);
