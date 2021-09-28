import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Access/Register';
import Login from './Components/Access/Login';
import Reset from './Components/Access/Reset';
import AllTasks from './Components/Task/AllTasks';
import NewTask from './Components/Task/NewTask';
import EditTask from './Components/Task/EditTask';
import { AuthProvider } from './Contexts/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/tarefas" exact component={AllTasks} />
        <Route path="/tarefa/nova" exact component={NewTask} />
        <Route path="/tarefa/:id" exact component={EditTask} />
        <Redirect exact from="/tarefa" to="/tarefas" />
        <Route path="/reset" exact component={Reset} />
        <Route path="/login" exact component={Login} />
        <Route path="/cadastro" exact component={Register} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
