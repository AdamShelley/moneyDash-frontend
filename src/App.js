import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import Account from "./views/Accounts";
import Logger from "./views/Logger";
import Settings from "./views/Settings";
import Navbar from "./components/Nav/Navbar";

import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import "./App.css";

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/accounts">
            <Account />
          </Route>
          <Route path="/logger">
            <Logger />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/Auth">
          <Auth />
        </Route>
        <Redirect to="/Auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login: login,
        logout: logout,
        token: token,
        userId: userId,
      }}
    >
      <Router>
        <div className="App">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
