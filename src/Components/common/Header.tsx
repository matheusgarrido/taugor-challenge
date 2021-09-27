import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Style from './Header.module.scss';
import { useAuth } from '../../Contexts/AuthContext';
import { findDocument } from '../../middleware/Firebase/Firestore';
import { authLogout } from '../../middleware/Firebase/Auth';

export default function Header() {
  const title = 'TSKMNGR';
  const { currentUser } = useAuth();
  const [username, setUsername] = useState('');

  if (currentUser) {
    const getUsername = async () => {
      const { uid } = currentUser;
      const doc = await findDocument('users', 'authId', uid);
      const { username: user } = doc[0];
      setUsername(user);
    };
    getUsername();
  }

  const handleLogout = () => {
    authLogout();
  };

  return (
    <AppBar position="static" className={Style.appbar}>
      <Toolbar className={Style.appbar__toolbar}>
        <Link to="/" className={Style.appbar__link}>
          <Typography variant="h6">{title}</Typography>
        </Link>
        {currentUser && (
          <ul className={Style.appbar__private}>
            {username && (
              <li>
                <Typography className={Style.appbar__username}>
                  #{username.toUpperCase()}
                </Typography>
              </li>
            )}
            <li>
              <Link to="/logout" className={Style.appbar__link}>
                <Button
                  variant="contained"
                  className={Style.appbar__button}
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </Link>
            </li>
          </ul>
        )}
        {!currentUser && (
          <ul className={Style.appbar__private}>
            <li>
              <Link to="/cadastro" className={Style.appbar__link}>
                <Button
                  variant="contained"
                  className={`${Style.appbar__button} ${Style.appbar__button__signup}`}
                  onClick={handleLogout}
                >
                  Criar Conta
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/login" className={Style.appbar__link}>
                <Button
                  variant="contained"
                  className={Style.appbar__button}
                  onClick={handleLogout}
                >
                  Entrar
                </Button>
              </Link>
            </li>
          </ul>
        )}
      </Toolbar>
    </AppBar>
  );
}
