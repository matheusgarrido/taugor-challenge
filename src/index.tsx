import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import NotFound from './Components/NotFound/NotFound';
require('dotenv/config');
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
