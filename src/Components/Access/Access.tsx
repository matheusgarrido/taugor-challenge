import React from 'react';
import Style from './Access.module.scss';
import { Card, Grid } from '@mui/material';

export default function Access(props: any) {
  return (
    <>
      <Grid container className={Style.grid}>
        <Card className={Style.card} variant="outlined">
          <h1>{props.title}</h1>
          {props.children}
        </Card>
      </Grid>
    </>
  );
}
