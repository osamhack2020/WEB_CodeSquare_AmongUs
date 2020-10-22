/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { RegisterForm } from "../../components/auth/RegisterForm";
import { TermForm } from "../../components/auth/TermForm";
import { Progress } from "../../components/common/Progress";

export const RegisterContainer: React.FC = (props) => {
  const history = useHistory();
  const [phase, setPhase] = useState(1);
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);
  const onNext = useCallback(() => {
    setPhase((phase) => phase + 1);
  }, [setPhase]);
  const onSubmit = useCallback(async (username: string, password: string) => {
    console.log(username);
    console.log(password);
  }, []);
  return (
    <div
      css={css`
        width: 450px;
        margin: 0 auto;
      `}
      {...props}
    >
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
        {phase === 1 && (
          <div>
            코드스퀘어 가입을
            <br />
            환영합니다 :)
          </div>
        )}
        {phase === 2 && (
          <div>
            가입에 필요한
            <br />
            정보를 입력해 주세요.
          </div>
        )}
      </div>
      <Progress percent={Math.round((100 / 3) * phase)} />
      {phase === 1 && <TermForm onCancel={onCancel} onNext={onNext}></TermForm>}
      {phase === 2 && (
        <RegisterForm onCancel={onCancel} onSubmit={onSubmit}></RegisterForm>
      )}
    </div>
  );
};
