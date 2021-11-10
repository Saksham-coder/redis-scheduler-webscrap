import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import ReactNotification from "react-notifications-component";
import store from "./store.js";

// PAGES
import LandingPage from "./Container/landingPage/LandingPage";
import DetialPage from "./Container/DetailPages"
import Header from './Components/Header'

import { loadUser } from "./store/actions/basicFeature";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <ReactNotification />
            <Header />
              <Route
                exact
                path="/read/:id"
                render={(routeProps) => <DetialPage {...routeProps} />}
              />
              <Route
                exact
                path="/"
                render={(routeProps) => <LandingPage {...routeProps} />}
              />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
