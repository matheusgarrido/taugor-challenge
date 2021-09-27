import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { Typography, Grid, CircularProgress, Box } from '@mui/material';
import LoadingStyle from '../../assets/styles/Loading.module.scss';
import { Redirect } from 'react-router-dom';
import Style from './Tasks.module.scss';
import Task from './Task';
import Form from './Form';

export default function NewTask() {
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

  return (
    <Task>
      <>
        <Box className={Style.task__title}>
          <Typography variant="h1" className={Style.task__title__text}>
            Nova Tarefa
          </Typography>
        </Box>
        {currentUser.uid && <Form currentResponsible={currentUser.uid}></Form>}
      </>
    </Task>
  );
}
