import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../Contexts/AuthContext';
import { Link, Redirect } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import LoadingStyle from '../../assets/styles/Loading.module.scss';
import useTaskList from './useTaskList';
import Style from './Tasks.module.scss';

export default function ListTasks() {
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

  const id = currentUser.uid;
  const { data } = useTaskList({ id });

  if (!data.allTasks.length) {
    return (
      <Typography variant="h5" className={Style.list__empty}>
        Não há tarefas cadastradas sob sua responsabilidade
      </Typography>
    );
  }
  return (
    <List style={{ margin: '20px 0' }}>
      {data.allTasks.map((task, index) => (
        <div className={Style.list} key={task.id}>
          <ListItem disablePadding className={Style.list__item}>
            <div className={Style.list__item__container}>
              <Typography variant="h5">
                {task.title} ({task.status})
              </Typography>
            </div>
            <div className={Style.list__item__container}>
              <Typography variant="h6">{task.description}</Typography>
            </div>
          </ListItem>
          {data.allFiles && (
            <a
              className={Style.list__file}
              href={data.allFiles[index]}
              target="_blank"
            >
              Arquivo
            </a>
          )}
          <IconButton aria-label="edit" size="large">
            <Link
              to={`/tarefa/${task.id}`}
              style={{ color: 'rgba(0, 0, 0, 0.54)' }}
            >
              <Edit fontSize="inherit" />
            </Link>
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <Delete fontSize="inherit" />
          </IconButton>
        </div>
      ))}
    </List>
  );
}
