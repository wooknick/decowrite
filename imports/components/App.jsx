import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import Theme from "../styles/Theme";
import GlobalStyles from "../styles/GlobalStyles";
import useWindowSize from "../hooks/useWinodwSize";
import Routes from "./Routes";
import AppContext from "./AppContext";
import { withTracker } from "meteor/react-meteor-data";

const Wrapper = styled.div`
  width: 100vw;
  max-width: 550px;
  height: ${props => props.innerHeight}px;
  min-height: 550px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`;

const App = props => {
  const [innerWidth, innerHeight] = useWindowSize();
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <AppContext.Provider value={props.account}>
        <Router>
          <Wrapper innerHeight={innerHeight}>
            <Routes />
          </Wrapper>
        </Router>
      </AppContext.Provider>
    </ThemeProvider>
  );
};
// export default App;
export default withTracker(() => {
  const user = Meteor.isServer ? null : Meteor.user();
  const userId = Meteor.isServer ? null : Meteor.userId();
  const nickname = user && user.profile && user.profile.nickname;
  return {
    account: {
      user,
      userId,
      isLoggedIn: !!userId,
      nickname
    }
  };
})(App);
