/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Footer } from "./components/base/Footer";
import { NotFound } from "./components/base/NotFound";
import { LoginContainer } from "./containers/auth/LoginContainer";
import { RegisterContainer } from "./containers/auth/RegisterContainer";
import { HeaderContainer } from "./containers/base/HeaderContainer";
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
      <HeaderContainer />
      <div
        css={css`
          flex: 1 1 auto;
        `}
      >
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to={`/${user.username}`} /> : <HomeContainer />}
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
          <Route path="/404">
            <NotFound />
          </Route>
          <Route exact path="/user/:username">
            <ProfileContainer />
          </Route>
          <Route path="/:unknown">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
