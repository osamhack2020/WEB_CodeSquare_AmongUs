/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { ReactNode } from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  password?: boolean;
  disabled?: boolean;
  label: string;
  message?: ReactNode;
  valid?: boolean;
  invalid?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      onClick,
      onSubmit,
      name,
      label,
      password = false,
      disabled = false,
      message,
      valid,
      invalid,
      placeholder,
    },
    ref,
  ) => {
    let hintColor = "#7c7c7c";
    if (valid) {
      hintColor = "#627bff";
    }
    if (invalid) {
      hintColor = "#fa2d2d";
    }
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
        <input
          name={name}
          type={password ? "password" : "text"}
          placeholder={placeholder}
          disabled={disabled}
          onSubmit={onSubmit}
          onClick={onClick}
          ref={ref}
          css={css`
            border: 1px solid #e3e3e3;
            height: 36px;
            border-radius: 4px;
            padding-left: 8px;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: -0.02em;
            text-align: left;
            :disabled {
              color: #959da5;
              background-color: #f3f4f6;
            }
            ::placeholder {
              color: #c0c0c0;
            }
          `}
        />
        {message && (
          <div
            css={css`
              margin-top: 5px;
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 17px;
              letter-spacing: -0.02em;

              height: 17px;
              color: ${hintColor};
            `}
          >
            {message}
          </div>
        )}
      </div>
    );
  },
);
