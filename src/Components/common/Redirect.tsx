import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import Style from './Redirect.module.scss';
import { CircularProgress, Grid } from '@mui/material';

interface IProps {
  children: JSX.Element;
  path: string;
}

export default function RedirectComponent({ children, path }: IProps) {
  const { currentUser } = useAuth();
  if (currentUser === undefined) {
    return (
      <Grid container className={Style.grid}>
        <div className={Style.progress}>
          <CircularProgress></CircularProgress>
        </div>
      </Grid>
    );
  }
  if (currentUser) {
    return <Redirect to={path} />;
  }
  return <>{children}</>;
}
