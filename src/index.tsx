import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Access/Register';
import { AuthProvider } from './Contexts/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/cadastro" exact component={Register} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
