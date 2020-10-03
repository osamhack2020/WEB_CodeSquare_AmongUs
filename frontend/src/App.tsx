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
      <Route exact path="/">
        <Button label="연결 테스트!" onClick={onTestClick} />
      </Route>
      <Route path="/login">
        <LoginContainer />
      </Route>
    </div>
  );
};

export default App;
