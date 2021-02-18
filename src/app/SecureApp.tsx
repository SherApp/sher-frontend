import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import UploadRoute from '../features/upload/UploadRoute';
import { Route, Switch, useHistory } from 'react-router-dom';
import SignInRoute from '../features/signIn/SignInRoute';
import React from 'react';
import { OktaAuth } from '@okta/okta-auth-js';
import config from '../utils/config';

const SecureApp = () => {
  const history = useHistory();

  const oktaAuth = new OktaAuth({
    issuer: `https://${config.okta.domain}/oauth2/default`,
    clientId: config.okta.clientId,
    redirectUri: window.location.origin + '/signIn/callback',
    pkce: true
  });

  const handleAuthRequired = () => {
    history.push('/signIn');
  };

  return (
    <Security oktaAuth={oktaAuth} onAuthRequired={handleAuthRequired}>
      <Switch>
        <SecureRoute exact path="/" component={UploadRoute} />
        <Route exact path="/signIn/callback" component={LoginCallback} />
        <Route path="/signIn" component={SignInRoute} />
      </Switch>
    </Security>
  );
};

export default SecureApp;
