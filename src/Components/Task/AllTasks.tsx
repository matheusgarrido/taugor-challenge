import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import { changeTitle } from '../../helpers/modifyHtmlHead';
import Style from './Tasks.module.scss';
import Task from './Task';
import List from './List';

export default function AllTasks() {
  changeTitle('Tarefas');
  return (
    <>
      <Task>
        <>
          <Box className={Style.task__title}>
            <Typography variant="h1" className={Style.task__title__text}>
              Tarefas
            </Typography>
            <Link to="/tarefa/nova" className={Style.task__link}>
              <Button variant="contained" className={Style.task__title__button}>
                Nova tarefa
              </Button>
            </Link>
          </Box>
          <List />
        </>
      </Task>
    </>
  );
}
