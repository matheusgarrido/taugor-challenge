import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import Style from './Tasks.module.scss';

interface IProps {
  info: string[];
}

export default function Changes(props: IProps) {
  console.log(props);

  return (
    <>
      <Typography variant="h5">Atualizações anteriores da tarefa</Typography>
      {!props.info.length && (
        <Typography style={{ textAlign: 'center' }}>
          Não há histórico
        </Typography>
      )}
      <List style={{ margin: '20px 0' }}>
        {props.info.map((info, index) => (
          <ListItem disablePadding className={Style.list} key={index}>
            <Typography variant="h6">{info}</Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
}
