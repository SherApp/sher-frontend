import UploadRoute from '../features/upload/UploadRoute';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import AccountMenu from '../features/auth/AccountMenu';
import BrowseFilesRoute from '../features/browseFiles/BrowseFilesRoute';
import RefreshTokenInterceptorProvider from '../features/auth/axios/RefreshTokenInterceptorProvider';
import SecureRoute from '../features/auth/SecureRoute';
import AdminRoute from '../features/manageInstance/AdminRoute';
import AuthRoute from '../features/auth/AuthRoute';
import { routes } from '../utils/config';

const SecureApp = () => {
  return (
    <RefreshTokenInterceptorProvider>
      <Route exact path={['/', routes.browseFiles, routes.admin]}>
        <AccountMenu className="absolute right-12 top-10" />
      </Route>
      <Switch>
        <SecureRoute exact path="/" component={UploadRoute} />
        <SecureRoute path={routes.browseFiles} component={BrowseFilesRoute} />
        <SecureRoute path={routes.admin} component={AdminRoute} />
        <Route path={routes.auth()} component={AuthRoute} />
      </Switch>
    </RefreshTokenInterceptorProvider>
  );
};

export default SecureApp;
