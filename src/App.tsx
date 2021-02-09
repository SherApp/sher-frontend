import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import SignInRoute from './features/signIn/SignInRoute';

function App() {
  return (
    <div className="flex min-h-screen min-w-full">
      <BrowserRouter>
        <Switch>
          <Route path="/signIn" component={SignInRoute} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
