/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

export type TermType = "service" | "privacy";

const TermFormBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextBox = styled.div`
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;
  overflow-y: scroll;
`;

export interface TermFormProps {
  term: TermType;
}

export const TermForm: React.FC<TermFormProps> = ({ term, ...props }) => {
  return (
    <TermFormBlock {...props}>
      {term === "service" && (
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
      )}
      {term === "privacy" && (
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
      )}
    </TermFormBlock>
  );
};
