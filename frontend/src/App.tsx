/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components/base/Header";
import { LoginContainer } from "./containers/auth/LoginContainer";
import { RegisterContainer } from "./containers/auth/RegisterContainer";
import { HomeContainer } from "./containers/HomeContainer";
import { ProfileContainer } from "./containers/profile/ProfileContainer";
import { QnaEditContainer } from "./containers/qna/QnaEditContainer";
import { QnaHomeContainer } from "./containers/qna/QnaHomeContainer";
import { QnaPostContainer } from "./containers/qna/QnaPostContainer";
import { QnaWriteContainer } from "./containers/qna/QnaWriteContainer";
import { VmHomeContainer } from "./containers/vm/VmHomeContainer";
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
        <Switch>
          <Route exact path="/">
            {user ? <ProfileContainer /> : <HomeContainer />}
          </Route>
          <Route path="/vm">
            <VmHomeContainer />
          </Route>
          <Route path="/qna/write" exact>
            <QnaWriteContainer />
          </Route>
          <Route path="/qna/edit" exact>
            <QnaEditContainer />
          </Route>
          <Route path="/qna" exact>
            <QnaHomeContainer />
          </Route>
          <Route path="/qna/:postId">
            <QnaPostContainer />
          </Route>
          <Route path="/login">
            <LoginContainer />
          </Route>
          <Route path="/register">
            <RegisterContainer />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
