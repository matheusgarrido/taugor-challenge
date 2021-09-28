import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { changeTitle } from '../../helpers/modifyHtmlHead';
import { findDocument, documentId } from '../../middleware/Firebase/Firestore';
import { Typography, Grid, CircularProgress, Box } from '@mui/material';
import LoadingStyle from '../../assets/styles/Loading.module.scss';
import { Redirect } from 'react-router-dom';
import Style from './Tasks.module.scss';
import Task from './Task';
import Changes from './Changes';
import Form from './Form';
import NotFound from '../NotFound/NotFound';

export default function NewTask() {
  const [task, setTask] = useState<any>();
  const [loading, setLoading] = useState(true);
  changeTitle('Nova Tarefa');
  const { currentUser } = useAuth();
  const { id: taskId }: { id: string } = useParams();
  const getTask = async () => {
    const currentTask = (await findDocument('tasks', documentId(), taskId))[0];
    console.log(currentTask);
    await setTask(currentTask);
    setLoading(false);
  };
  useEffect(() => {
    getTask();
  }, []);

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

  if (!task && !loading) return <NotFound />;

  return (
    <Task>
      <>
        <Box className={Style.task__title}>
          <Typography variant="h1" className={Style.task__title__text}>
            Editar Tarefa
          </Typography>
        </Box>
        {currentUser.uid && task && (
          <>
            <Form
              currentResponsible={currentUser.uid}
              currentDescription={task.description}
              currentTitle={task.title}
              currentStatus={task.status}
              currentType="update"
              currentId={taskId}
            ></Form>
            {<Changes info={task.updateInfo || []}></Changes>}
          </>
        )}
      </>
    </Task>
  );
}
