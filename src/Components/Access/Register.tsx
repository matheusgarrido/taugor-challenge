import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { changeTitle } from '../../helpers/modifyHtmlHead';
import Style from './Access.module.scss';
import GridAccess from './Access';
import useLogin from './useLogin';

const Register = () => {
  changeTitle('Cadastro');
  const { data, error, handle, validate } = useLogin('register');
  return (
    <GridAccess title="Registre-se">
      <form onSubmit={handle.submit}>
        <TextField
          error={error.field === 'name'}
          id="name"
          label="Nome Completo"
          type="text"
          variant="outlined"
          helperText={error.field === 'name' ? error.message : ''}
          value={data.name}
          onInput={handle.data}
          className={Style.card__input}
          required
        />
        <TextField
          error={error.field === 'username'}
          id="username"
          label="Nome de usuário"
          type="text"
          variant="outlined"
          helperText={error.field === 'username' ? error.message : ''}
          value={data.username}
          onInput={handle.data}
          className={Style.card__input}
          required
        />
        <TextField
          error={error.field === 'email'}
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          helperText={error.field === 'email' ? error.message : ''}
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
          <Typography>Já possui uma conta?</Typography>
          <Link to="/login">
            <Typography>Entre por aqui</Typography>
          </Link>
        </div>
      </form>
    </GridAccess>
  );
};

export default Register;
