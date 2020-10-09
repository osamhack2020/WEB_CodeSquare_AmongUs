/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Route } from "react-router-dom";
import { Header } from "./components/base/Header";
import { LoginContainer } from "./containers/auth/LoginContainer";
import { RegisterContainer } from "./containers/auth/RegisterContainer";
import { MainContainer } from "./containers/MainContainer";

const App: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Header />
      <div
        css={css`
          flex: 1 1 auto;
        `}
      >
        <Route exact path="/">
          <MainContainer />
        </Route>
        <Route path="/login">
          <LoginContainer
            css={css`
              margin: 0 auto;
            `}
          />
        </Route>
        <Route path="/register">
          <RegisterContainer
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
