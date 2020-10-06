/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import { Button } from "../common/Button";
import { RadioButton } from "../common/RadioButton";
import { Progress } from "../common/Progress";

interface Terms {
  service: boolean;
  privacy: boolean;
}

const RegisterFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
`;

const TextBox = styled.div`
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;
  overflow-y: scroll;
`;

export interface RegisterFormProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onCancel,
  onSubmit,
  ...props
}) => {
  const [terms, setTerms] = useState<Terms>({ service: false, privacy: false });
  const handleAgreeAll = useCallback(() => {
    setTerms((terms) => {
      if (terms.privacy && terms.service) {
        return { privacy: false, service: false };
      }
      return { privacy: true, service: true };
    });
  }, [setTerms]);
  const handleAgreeService = useCallback(() => {
    setTerms((terms) => ({ ...terms, service: !terms.service }));
  }, [setTerms]);
  const handleAgreePrivacy = useCallback(() => {
    setTerms((terms) => ({ ...terms, privacy: !terms.privacy }));
  }, [setTerms]);

  return (
    <RegisterFormBlock {...props}>
      <div
        css={css`
          text-align: left;
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
        <div>
          코드스퀘어 가입을
          <br />
          환영합니다 :)
        </div>
      </div>
      <Progress percent={33} />
      <RadioButton
        checked={terms.privacy && terms.service}
        onClick={handleAgreeAll}
        css={css`
          padding-top: 16px;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 20px;
          letter-spacing: -0.02em;
        `}
      >
        코드스퀘어 이용약관, 개인정보의 수집 및 이용에 모두 동의합니다.
      </RadioButton>
      <div
        css={css`
          padding-top: 32px;
        `}
      >
        <RadioButton
          checked={terms.service}
          onClick={handleAgreeService}
          css={css`
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: -0.02em;
          `}
        >
          <div>이용약관 동의</div>
          <div
            css={css`
              color: #627bff;
            `}
          >
            (필수)
          </div>
        </RadioButton>
        <TextBox
          css={css`
            margin-top: 10px;
            height: 128px;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: 19px;
            letter-spacing: -0.02em;
            text-align: left;
          `}
        >
          <h3>제1장 총칙</h3>
          <h4>제1조(목적)</h4>
          <p>
            이 약관은 코드스퀘어(이하 "회사"라 합니다)가 제공하는
            코드스퀘어(이하 "서비스"라 합니다)의 이용에 관한 조건 및 절차에 관한
            기본적인 사항과 기타 필요한 사항을 규정하는 것을 목적으로 합니다.
          </p>
        </TextBox>
      </div>
      <div
        css={css`
          padding-top: 32px;
        `}
      >
        <RadioButton
          checked={terms.privacy}
          onClick={handleAgreePrivacy}
          css={css`
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: -0.02em;
          `}
        >
          <div>개인정보 수집 및 이용 동의</div>
          <div
            css={css`
              color: #627bff;
            `}
          >
            (필수)
          </div>
        </RadioButton>
        <TextBox
          css={css`
            margin-top: 10px;
            height: 128px;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: 19px;
            letter-spacing: -0.02em;
            text-align: left;
          `}
        >
          <p>
            개인정보보호법에 따라 코드스퀘어(CodeSqaure)에 회원가입 신청하시는
            분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적,
            개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에
            관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
          </p>
          <p>1. 수집하는 개인정보</p>
        </TextBox>
      </div>
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
          onClick={onSubmit}
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
            다음
          </div>
        </Button>
      </div>
    </RegisterFormBlock>
  );
};
