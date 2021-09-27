import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { changeTitle } from '../../helpers/modifyHtmlHead';
import Style from './Access.module.scss';
import RedirectComponent from '../common/Redirect';
import GridAccess from './Access';
import useAccess from './useAccess';

const Register = () => {
  changeTitle('Login');
  const { data, error, handle, validate } = useAccess('login');
  return (
    <RedirectComponent path="/tarefas">
      <GridAccess title="Login">
        <form onSubmit={handle.submit}>
          <TextField
            error={!!error.field}
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={data.email}
            onInput={handle.data}
            className={Style.card__input}
            required
          />
          <TextField
            error={error.field === 'password'}
            id="password"
            label="Senha"
            type="password"
            variant="outlined"
            helperText={error.field === 'password' ? error.message : ''}
            value={data.password}
            onInput={handle.data}
            className={Style.card__input}
            required
          />
          <Button
            variant="contained"
            disabled={!!validate()}
            type="submit"
            className={Style.card__button}
          >
            Login
          </Button>
          <div className={Style.card__message}>
            <Link to="/cadastro">
              <Typography>Esqueci minha senha</Typography>
            </Link>
          </div>
        </form>
      </GridAccess>
    </RedirectComponent>
  );
};

export default Register;
