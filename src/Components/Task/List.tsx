import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, Typography, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { getAllDocuments } from '../../middleware/Firebase/Firestore';
import Style from './Tasks.module.scss';

interface ITask {
  title: string;
  description: string;
  status: string;
  responsible: string;
  id: string;
}

export default function ListTasks() {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const getAllTasks = async () => {
    const tasks = await getAllDocuments('tasks');
    tasks.sort((a, b) => a.title.localeCompare(b.title));
    setAllTasks(tasks);
  };
  useEffect(() => {
    getAllTasks();
  }, []);
  if (!allTasks.length) {
    return <></>;
  }
  console.log(allTasks);
  return (
    <List style={{ margin: '20px 0' }}>
      {allTasks.map((task) => (
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
          <span className={Style.list__file}>Arquivo</span>
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
