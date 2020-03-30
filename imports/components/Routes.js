import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Landing from "../routes/Landing";
import SignUp from "../routes/SignUp";
import SignIn from "../routes/SignIn";
import Lists from "../routes/Lists";
import MyPage from "../routes/MyPage";
import Read from "../routes/Read";
import AppContext from "./AppContext";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/lists" component={Lists} />
    <Route path="/mypage" component={MyPage} />
    <Route path="/read/:bookId" component={Read} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/lists" component={Lists} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route path="/read/:bookId" component={Read} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = () => {
  const { user, userId, isLoggedIn } = useContext(AppContext);
  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
};
export default AppRouter;
