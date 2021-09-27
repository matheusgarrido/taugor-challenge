import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { changeTitle } from '../../helpers/modifyHtmlHead';
import Style from './Access.module.scss';
import GridAccess from './Access';
import useAccess from './useAccess';

const Reset = () => {
  changeTitle('Redefinição de senha');
  const { data, error, handle, validate } = useAccess('reset');
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const handleInput = () => {
    setSent(false);
  };
  const handleSubmit = () => {
    setEmail(data.email);
    setSent(true);
  };

  return (
    <GridAccess title="Redefinir senha">
      <form onSubmit={handle.submit} onInput={handleInput}>
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
        {sent && (
          <Typography>
            Um link para redefinir senha foi enviado para {email}
          </Typography>
        )}
        <Button
          variant="contained"
          disabled={!!validate()}
          type="submit"
          className={Style.card__button}
          onClick={handleSubmit}
        >
          Enviar email
        </Button>
        <Link to="/login">
          <Typography>Voltar para Login</Typography>
        </Link>
      </form>
    </GridAccess>
  );
};

export default Reset;
