/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { Button } from "../common/Button";
import { WrapperLink } from "../common/WrapperLink";
import { Input } from "../common/Input";
import { useForm } from "react-hook-form";

const LoginFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
`;

export interface LoginForm {
  onSubmit: (data: LoginFormInput) => Promise<void>;
  onCancel: () => void;
}

export interface LoginFormInput {
  username: string;
  password: string;
}

export const LoginForm: React.FC<LoginForm> = ({
  onSubmit: login,
  onCancel,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    errors,
    clearErrors,
    setError,
    formState,
  } = useForm<LoginFormInput>({ mode: "onChange" });

  useEffect(() => {
    if (formState.submitCount > 0 && formState.isValid) {
      setError("password", {
        type: "manual",
        message: "존재하지 않는 아이디거나, 비밀번호가 일치하지 않습니다.",
      });
    }
  }, [formState.submitCount, formState.isValid, setError]);

  return (
    <LoginFormBlock {...props}>
      <div
        css={css`
          text-align: center;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 35px;
          letter-spacing: -0.02em;

          padding-top: 74px;
          padding-bottom: 53px;

          user-select: none;
        `}
      >
        다시 만나서 반가워요!
      </div>
      <Input
        name="username"
        label="아이디"
        ref={register({ required: true, minLength: 1 })}
        css={css`
          margin-bottom: 15px;
        `}
        disabled={formState.isSubmitting}
        message={errors.username && "아이디를 입력해 주세요."}
        invalid={!!errors.username}
      />
      <Input
        name="password"
        label="비밀번호"
        ref={register({
          required: "비밀번호를 입력해 주세요.",
          minLength: { value: 1, message: "비밀번호를 입력해 주세요." },
        })}
        onClick={() => clearErrors("password")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(login)();
          }
        }}
        password
        disabled={formState.isSubmitting}
        message={errors.password?.message}
        invalid={!!errors.password}
      />
      <div
        css={css`
          display: flex;
          margin-top: 36px;
        `}
      >
        <Button
          onClick={onCancel}
          css={css`
            background: #c4c4c4;
            color: black;
            border-radius: 4px;
            width: 100%;
            height: 45px;
            margin-right: 16px;
          `}
        >
          <div
            css={css`
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              line-height: 26px;
              letter-spacing: -0.02em;
              text-align: center;
            `}
          >
            취소
          </div>
        </Button>
        <Button
          onClick={handleSubmit(login)}
          css={css`
            border-radius: 4px;
            height: 45px;
            width: 100%;
          `}
          disabled={formState.isSubmitting}
        >
          <div
            css={css`
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              line-height: 26px;
              letter-spacing: -0.02em;
              text-align: center;
            `}
          >
            로그인
          </div>
        </Button>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 27px;
        `}
      >
        <div
          css={css`
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 17px;
            text-align: center;
            letter-spacing: -0.02em;

            color: #676767;
          `}
        >
          코드스퀘어가 처음이신가요?
        </div>
        <WrapperLink to="/register">
          <div
            css={css`
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 17px;
              text-align: center;
              letter-spacing: -0.02em;
              text-decoration-line: underline;

              color: #676767;
            `}
          >
            회원가입
          </div>
        </WrapperLink>
      </div>
    </LoginFormBlock>
  );
};
