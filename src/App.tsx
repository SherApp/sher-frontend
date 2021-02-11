import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInRoute from './features/signIn/SignInRoute';
import { LoginCallback, Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';

function App() {
  const oktaAuth = new OktaAuth({
    issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
    redirectUri: window.location.origin + '/signIn/callback',
    pkce: true
  });

  return (
    <div className="flex min-h-screen min-w-full">
      <BrowserRouter>
        <Security oktaAuth={oktaAuth}>
          <Switch>
            <Route exact path="/">
              xyz
            </Route>
            <Route exact path="/signIn/callback" component={LoginCallback} />
            <Route path="/signIn" component={SignInRoute} />
          </Switch>
        </Security>
      </BrowserRouter>
    </div>
  );
}

export default App;
