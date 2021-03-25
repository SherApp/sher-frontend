import UploadRoute from '../features/upload/UploadRoute';
import { Route, Switch } from 'react-router-dom';
import SignInRoute from '../features/auth/SignInRoute';
import React from 'react';
import AccountMenu from '../features/auth/AccountMenu';
import BrowseFilesRoute from '../features/browseFiles/BrowseFilesRoute';
import RefreshTokenInterceptorProvider from '../features/auth/axios/RefreshTokenInterceptorProvider';
import SecureRoute from '../features/auth/SecureRoute';

const SecureApp = () => {
  return (
    <RefreshTokenInterceptorProvider>
      <AccountMenu className="absolute right-12 top-10" />
      <Switch>
        <SecureRoute exact path="/" component={UploadRoute} />
        <SecureRoute path="/browse" component={BrowseFilesRoute} />
        <Route path="/signIn" component={SignInRoute} />
      </Switch>
    </RefreshTokenInterceptorProvider>
  );
};

export default SecureApp;
