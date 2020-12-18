import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import CategoryProvider from "./contexts/CategoryContext";
import ProfileProvider from "./contexts/ProfileContext";
import AuthProvider from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Configure from "./components/Configure";
import EditBudgets from "./components/EditBudgets";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import NavBarr from "./components/NavBar";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* // Every Context object comes with a Provider component which consumes all nested components
      consumed components to subscribe to context changes. */}
          <ProfileProvider>
            <CategoryProvider>
              {/* We will wrap <Router /> in <Provider /> so that route handlers can get access to the store. */}
              {/* so that when the URL changes, <Router /> will match a branch of its routes, and render their configured components */}
              {/*  links text to route */}
              <ReactNotification />
              <NavBarr />
              <UnPrivateRoute path="/login" component={Login} />
              <UnPrivateRoute path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/configure" component={Configure} />
              <Route path="/editbudgets" component={EditBudgets} />
              <Route path="/" exact component={Dashboard} />
            </CategoryProvider>
          </ProfileProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
