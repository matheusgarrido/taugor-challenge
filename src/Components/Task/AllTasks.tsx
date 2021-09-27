import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import Style from './Tasks.module.scss';
import Task from './Task';

export default function AllTasks() {
  return (
    <>
      <Task>
        <Box className={Style.task__title} sx={{ display: 'inline' }}>
          <Typography variant="h1" className={Style.task__title__text}>
            Tarefas
          </Typography>
          <Link to="/tarefa/nova" className={Style.task__link}>
            <Button variant="contained" className={Style.task__title__button}>
              Nova tarefa
            </Button>
          </Link>
        </Box>
      </Task>
    </>
  );
}
