/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { OutlineButton } from "../../components/common/OutlineButton";
import { VmInformation } from "../../components/vm/VmInformation";
import { VmSettings } from "../../components/vm/VmSettings";
import { RootState } from "../../modules";
import { User } from "../../modules/core";

const StatusIcon: React.FC<{ status: "ready" | "loading" | "pause" }> = ({
  status,
}) => {
  let color = "#627bff";
  if (status === "loading") {
    color = "#ff9b21";
  }
  if (status === "pause") {
    color = "#ff325b";
  }
  return (
    <div
      css={css`
        width: 10px;
        height: 10px;
        background: ${color};
        border-radius: 50%;
      `}
    />
  );
};

export const VmStatusContainer: React.FC = () => {
  const history = useHistory();
  const user = useSelector<RootState, User | null>((state) => state.core.user);
  useEffect(() => {
    if (!user) {
      history.replace("/");
    }
  }, [user, history]);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        max-width: 740px;
        margin: 0 auto;
        padding-top: 100px;
      `}
    >
      <div
        css={css`
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 17px;
          display: flex;
          align-items: center;
          letter-spacing: -0.02em;

          color: #323232;
          display: flex;
        `}
      >
        <StatusIcon status="loading" />
        <div
          css={css`
            margin-left: 5px;
          `}
        >
          켜는 중
        </div>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          padding-bottom: 80px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              font-style: normal;
              font-weight: normal;
              font-size: 24px;
              line-height: 35px;
              letter-spacing: -0.02em;

              color: #323232;
            `}
          >
            {user?.username}님의 개발환경
          </div>
          <div
            css={css`
              flex: 1 1 auto;
            `}
          />
          <div
            css={css`
              font-style: normal;
              font-weight: normal;
              font-size: 13px;
              line-height: 19px;
              letter-spacing: -0.02em;

              color: #7c7c7c;
            `}
          >
            마지막 접속 {"30분 전"}
          </div>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            & > button {
              border-radius: 6px;
              padding: 6px 24px;
            }
          `}
        >
          <Button
            css={css`
              font-size: 14px;
              font-style: normal;
              font-weight: 700;
              line-height: 20px;
              letter-spacing: -0.02em;
              text-align: center;

              margin-bottom: 7px;
            `}
          >
            IDE 실행
          </Button>
          <OutlineButton
            css={css`
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
              letter-spacing: -0.02em;
              text-align: center;

              color: #323232;

              border: 1px solid #bababa;
            `}
          >
            멈추기
          </OutlineButton>
        </div>
      </div>
      <VmInformation
        created_at="2020-09-15"
        css={css`
          padding-bottom: 47px;
        `}
      />
      <VmSettings />
    </div>
  );
};
