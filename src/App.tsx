import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UploadRoute from './features/upload/UploadRoute';
import SignInRoute from './features/signIn/SignInRoute';
import { LoginCallback, Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import config from './utils/config';

function App() {
  const oktaAuth = new OktaAuth({
    issuer: `https://${config.okta.domain}/oauth2/default`,
    clientId: config.okta.clientId,
    redirectUri: window.location.origin + '/signIn/callback',
    pkce: true
  });

  return (
    <div className="flex min-h-screen min-w-full">
      <div className="flex flex-grow flex-col justify-center items-center">
        <BrowserRouter>
          <Security oktaAuth={oktaAuth}>
            <Switch>
              <Route exact path="/" component={UploadRoute} />
              <Route exact path="/signIn/callback" component={LoginCallback} />
              <Route path="/signIn" component={SignInRoute} />
            </Switch>
          </Security>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
