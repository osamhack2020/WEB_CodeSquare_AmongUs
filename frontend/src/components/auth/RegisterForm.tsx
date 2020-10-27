/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { useForm } from "react-hook-form";
import { Select } from "../common/Select";
import { RadioInput } from "../common/RadioInput";
import React, { useCallback, useState } from "react";
import { TermForm, TermType } from "./TermForm";

const RegisterFormBlock = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(:last-child) {
    margin-bottom: 15px;
  }
`;

enum MemberRankEnum {
  대장 = "대장",
  중장 = "중장",
  소장 = "소장",
  준장 = "준장",
  대령 = "대령",
  중령 = "중령",
  소령 = "소령",
  대위 = "대위",
  중위 = "중위",
  소위 = "소위",
  준위 = "준위",
  원사 = "원사",
  상사 = "상사",
  중사 = "중사",
  하사 = "하사",
  병장 = "병장",
  상병 = "상병",
  일병 = "일병",
  이병 = "이병",
}

const MEMBER_RANK_OPTIONS = [
  { label: "대장", value: "대장" },
  { label: "중장", value: "중장" },
  { label: "소장", value: "소장" },
  { label: "준장", value: "준장" },
  { label: "대령", value: "대령" },
  { label: "중령", value: "중령" },
  { label: "소령", value: "소령" },
  { label: "대위", value: "대위" },
  { label: "중위", value: "중위" },
  { label: "소위", value: "소위" },
  { label: "준위", value: "준위" },
  { label: "원사", value: "원사" },
  { label: "상사", value: "상사" },
  { label: "중사", value: "중사" },
  { label: "하사", value: "하사" },
  { label: "병장", value: "병장" },
  { label: "상병", value: "상병" },
  { label: "일병", value: "일병" },
  { label: "이병", value: "이병" },
];

enum MemberGroupEnum {
  국직 = "국방부 직할 부대",
  육군 = "육군",
  공군 = "공군",
  해군 = "해군",
}

const MEMBER_GROUP_OPTIONS = [
  { label: "국직", value: "국방부 직할 부대" },
  { label: "육군", value: "육군" },
  { label: "공군", value: "공군" },
  { label: "해군", value: "해군" },
];

export interface RegisterFormInput {
  username: string;
  password: string;
  password2: string;
  member_name: string;
  member_group: MemberGroupEnum;
  member_rank: MemberRankEnum;
  dog_tags: string;
}

export interface RegisterFormProps {
  onCancel: () => void;
  onSubmit: (data: RegisterFormInput) => Promise<void>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onCancel,
  onSubmit,
  ...props
}) => {
  const { register, handleSubmit, errors, watch, formState } = useForm<
    RegisterFormInput
  >({ mode: "onChange" });
  const [term, setTerm] = useState<TermType | null>(null);
  const [agree, setAgree] = useState(false);
  const onTermClick = useCallback(
    (term: TermType) => () =>
      setTerm((prev) => {
        if (prev === term) {
          return null;
        }
        return term;
      }),
    [],
  );
  const disabled = !formState.isValid || !agree;

  return (
    <RegisterFormBlock {...props}>
      <Input
        disabled={formState.isSubmitting}
        ref={register({
          required: "아이디를 입력해 주세요.",
          pattern: {
            value: /^[a-z0-9]{5,20}$/i,
            message: "5~20자의 영문 소문자, 숫자만 사용이 가능해요.",
          },
        })}
        label="아이디"
        name="username"
        message={
          <React.Fragment>
            {!formState.dirtyFields.username &&
              !errors.username?.message &&
              "5~20자의 영문 소문자, 숫자"}
            {formState.dirtyFields.username &&
              !errors.username?.message &&
              "사용할 수 있는 아이디에요."}
            {errors.username?.message}
          </React.Fragment>
        }
        valid={formState.dirtyFields.username && !errors.username}
        invalid={!!errors.username}
      />
      <Input
        disabled={formState.isSubmitting}
        ref={register({
          required: "비밀번호를 입력해 주세요.",
          minLength: {
            value: 10,
            message: "비밀번호가 최소 10자는 되어야 해요.",
          },
          validate: (value: string) => {
            let chk = 0;
            if (value.search(/[0-9]/g) >= 0) {
              chk = chk + 1;
            }
            if (value.search(/[a-zA-Z]/gi) >= 0) {
              chk = chk + 1;
            }
            if (value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/g) >= 0) {
              chk = chk + 1;
            }
            if (chk < 2) {
              return "영문자, 숫자, 특수문자 중 2가지 이상을 사용해야 해요.";
            }
            return true;
          },
        })}
        label="비밀번호"
        name="password"
        message={
          <React.Fragment>
            {!formState.dirtyFields.password &&
              !errors.password?.message &&
              "10자 이상, 영문자/숫자/특수문자 중 2가지 이상 사용"}
            {formState.dirtyFields.password &&
              !errors.password?.message &&
              "안전한 비밀번호에요!"}
            {errors.password?.message}
          </React.Fragment>
        }
        password
        valid={formState.dirtyFields.password && !errors.password}
        invalid={!!errors.password}
      />
      <Input
        disabled={formState.isSubmitting}
        ref={register({
          required: "비밀번호를 다시 한 번 입력해주세요.",
          validate: (value) =>
            watch("password") === value || "비밀번호가 일치하지 않아요.",
        })}
        label="비밀번호 확인"
        name="password2"
        message={
          <React.Fragment>
            {!formState.dirtyFields.password2 &&
              !errors.password2?.message &&
              "비밀번호 재입력"}
            {formState.dirtyFields.password2 &&
              !errors.password2?.message &&
              "비밀번호가 일치해요."}
            {errors.password2?.message}
          </React.Fragment>
        }
        password
        valid={formState.dirtyFields.password2 && !errors.password2}
        invalid={!!errors.password2}
      />
      <div
        css={css`
          display: flex;
        `}
      >
        <Select
          disabled={formState.isSubmitting}
          label="계급"
          name="member_rank"
          ref={register}
          css={css`
            flex-basis: 35%;
            margin-right: 15px;
          `}
          options={MEMBER_RANK_OPTIONS}
        />
        <Input
          disabled={formState.isSubmitting}
          ref={register({ required: true })}
          label="이름"
          name="member_name"
          css={css`
            flex-basis: 60%;
          `}
        />
      </div>
      <div
        css={css`
          display: flex;
        `}
      >
        <Select
          disabled={formState.isSubmitting}
          label="소속"
          name="member_group"
          ref={register}
          css={css`
            flex-basis: 35%;
            margin-right: 15px;
          `}
          options={MEMBER_GROUP_OPTIONS}
        />
        <Input
          disabled={formState.isSubmitting}
          ref={register({ required: true, pattern: /^[0-9]+$/i })}
          placeholder="‘-’를 제외하고 입력"
          label="군번"
          name="dog_tags"
          css={css`
            flex-basis: 60%;
          `}
        />
      </div>
      <RadioInput
        disabled={formState.isSubmitting}
        checked={agree}
        onClick={() => setAgree((val) => !val)}
        css={css`
          padding-top: 12px;
        `}
      >
        <div
          css={css`
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.02em;
            color: #323232;
            & > span {
              color: #627bff;
              cursor: pointer;
            }
          `}
        >
          <span onClick={onTermClick("service")}>코드스퀘어 이용약관</span>과{" "}
          <span onClick={onTermClick("privacy")}>개인정보의 수집 및 이용</span>
          에 동의합니다.
        </div>
      </RadioInput>
      {term && <TermForm term={term} />}
      <div
        css={css`
          display: flex;
          margin-top: 36px;
        `}
      >
        <Button
          onClick={onCancel}
          css={css`
            background: #e3e3e3;
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
          disabled={disabled || formState.isSubmitting}
          onClick={handleSubmit(onSubmit)}
          css={css`
            border-radius: 4px;
            height: 45px;
            width: 100%;
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
            가입하기
          </div>
        </Button>
      </div>
    </RegisterFormBlock>
  );
};
