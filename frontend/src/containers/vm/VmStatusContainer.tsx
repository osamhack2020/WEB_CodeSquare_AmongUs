/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp, CompatClient } from "@stomp/stompjs";
import { Button } from "../../components/common/Button";
import { OutlineButton } from "../../components/common/OutlineButton";
import { VmInformation } from "../../components/vm/VmInformation";
import { VmSettings } from "../../components/vm/VmSettings";
import { RootState } from "../../modules";
import { User } from "../../modules/core";

type VmStatus = "ready" | "loading" | "pause" | "error";

const StatusIcon: React.FC<{ status: VmStatus }> = ({ status }) => {
  let color = "#627bff";
  if (status === "loading") {
    color = "#ff9b21";
  }
  if (status === "pause" || status === "error") {
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

export interface VmStatusContainerProps {
  status?: VmStatus;
}

export const VmStatusContainer: React.FC<VmStatusContainerProps> = ({
  status = "ready",
}) => {
  const history = useHistory();
  const user = useSelector<RootState, User | null>((state) => state.core.user);
  useEffect(() => {
    if (!user) {
      history.replace("/");
    }
  }, [user, history]);
  const [client, setClient] = useState<CompatClient | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let sockJS = new SockJS("http://52.22.190.9:9191/vm");
    let stompClient: CompatClient = Stomp.over(sockJS);
    if (process.env.NODE_ENV === "development") {
      stompClient.debug = (msg) => console.log(msg);
    }
    stompClient.activate();
    setClient(stompClient);
    return () => {
      stompClient.deactivate();
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (client) {
      client.onConnect = () => {
        setConnected(true);
      };
      client.onDisconnect = () => {
        setConnected(false);
      };
    }
  }, [client, setConnected]);
  useEffect(() => {
    if (client && connected) {
      client.publish({ destination: "/receive" });
      const subId = client.subscribe("/send", (msg) => console.log(msg));
      return () => {
        subId?.unsubscribe();
      };
    }
  }, [client, connected]);
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
        <StatusIcon status={status} />
        <div
          css={css`
            margin-left: 5px;
          `}
        >
          {status === "ready" && "켜져 있음"}
          {status === "loading" && "켜는 중"}
          {status === "pause" && "일시 정지"}
          {status === "error" && "오류"}
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
