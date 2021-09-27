import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Access/Register';
import Login from './Components/Access/Login';
import { AuthProvider } from './Contexts/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/cadastro" exact component={Register} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
