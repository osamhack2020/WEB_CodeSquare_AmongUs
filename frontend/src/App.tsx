/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Header } from "./components/base/Header";
import { LoginContainer } from "./containers/auth/LoginContainer";
import { RegisterContainer } from "./containers/auth/RegisterContainer";
import { MainContainer } from "./containers/MainContainer";
import { ProfileContainer } from "./containers/profile/ProfileContainer";
import { QnaHomeContainer } from "./containers/qna/QnaHomeContainer";
import { RootState } from "./modules";

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.core.user);
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
          {user ? <ProfileContainer /> : <MainContainer />}
        </Route>
        <Route path="/qna">
          <QnaHomeContainer
            css={css`
              margin: 0 auto;
              padding-top: 83px;
            `}
          />
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
