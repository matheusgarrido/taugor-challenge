import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { findDocument } from '../../middleware/Firebase/Firestore';
import LoadingStyle from '../../assets/styles/Loading.module.scss';
import Style from './Tasks.module.scss';
import Header from '../common/Header';

interface IProps {
  children: JSX.Element;
}

export default function Task({ children }: IProps) {
  const { currentUser } = useAuth();
  if (currentUser === undefined) {
    return (
      <Grid container className={LoadingStyle.grid}>
        <div className={LoadingStyle.progress}>
          <CircularProgress></CircularProgress>
        </div>
      </Grid>
    );
  }
  if (!currentUser) return <Redirect to="/login" />;

  const [name, setName] = useState('');

  if (currentUser) {
    const getName = async () => {
      const { uid } = currentUser;
      const doc = await findDocument('users', 'authId', uid);
      const { name } = doc[0];
      setName(name);
    };
    getName();
  }

  return (
    <>
      <Header />
      <main className={Style.main}>{children}</main>
    </>
  );
}
