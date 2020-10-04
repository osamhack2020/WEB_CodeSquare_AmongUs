/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback } from "react";
import { Route, Router } from "react-router-dom";
import { Header } from "./components/base/Header";
import { Button } from "./components/common/Button";
import { LoginContainer } from "./containers/login/LoginContainer";
import apiClient from "./lib/api/apiClient";

const test = () => apiClient.get("/authorized");

const App: React.FC = () => {
  const onTestClick = useCallback(async () => {
    const { data } = await test();
    console.log(data);
  }, []);

  return (
    <div>
      <Header />
      <div
        css={css`
          width: 100%;
          height: 100%;
        `}
      >
        <Route exact path="/">
          <Button onClick={onTestClick}>연결 테스트!</Button>
        </Route>
        <Route path="/login">
          <LoginContainer
            css={css`
              margin: 0 auto;
            `}
          />
        </Route>
      </div>
    </div>
  );
};

export default App;
