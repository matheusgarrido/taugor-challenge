import React from 'react';
import { changeTitle } from '../../helpers/modifyHtmlHead';
import { Typography, Grid, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Style from './NotFound.module.scss';

import Header from '../common/Header';

const NotFound = () => {
  changeTitle('Error 404');
  return (
    <>
      <Header />
      <Box className={Style.task__title}>
        <Typography variant="h1" className={Style.title}>
          Error 404
        </Typography>
        <Typography className={Style.message}>Página não encontrada</Typography>
        <Typography className={Style.message}>
          <Link to="/tarefas"> Voltar para a página principal</Link>
        </Typography>
      </Box>
    </>
  );
};

export default NotFound;
