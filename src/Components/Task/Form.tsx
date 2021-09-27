import React from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Input,
  InputLabel,
  Box,
  FormControl,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useTaskForm from './useTaskForm';
import Style from './Tasks.module.scss';

export default function Form({
  currentResponsible = '',
  currentDescription = '',
  currentStatus = '',
  currentTitle = '',
  currentFile = '',
}) {
  const { data, selectOptions, handle, error, success, validate } = useTaskForm(
    {
      responsible: currentResponsible,
      description: currentDescription,
      title: currentTitle,
      status: currentStatus,
      file: currentFile,
      type: 'new',
    }
  );

  const getFileName = () => {
    const splitted = data.file.split('\\');
    return splitted[splitted.length - 1];
  };
  return (
    <form onSubmit={handle.submit}>
      <Box className={Style.form}>
        <Box className={Style.form__column}>
          <TextField
            id="title"
            label="Título"
            type="text"
            variant="outlined"
            value={data.title}
            onInput={handle.title}
            className={Style.form__input}
            required
          />
          <TextField
            id="description"
            label="Descrição"
            type="text"
            variant="outlined"
            value={data.description}
            onInput={handle.description}
            className={Style.form__input}
            required
          />
          <FormControl className={Style.form__input} required>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={data.status}
              onChange={handle.status}
              label="Status"
            >
              {selectOptions.allStatus.map((value, index) => (
                <MenuItem value={value} key={index}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={Style.form__column}>
          <FormControl className={Style.form__input} required>
            <InputLabel id="responsable-label">Responsável</InputLabel>
            <Select
              labelId="responsable-label"
              id="responsable"
              value={data.responsible}
              onChange={handle.responsible}
              label="Responsável"
            >
              {selectOptions.allUsers.map(({ name, id, username }) => (
                <MenuItem value={id} key={id}>
                  {name} (#{username.toLocaleLowerCase()})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <fieldset
            className={
              (!!error.file && Style.form__input__file__error) ||
              Style.form__input__file
            }
          >
            <legend>
              <InputLabel
                className={
                  (!!error.file && Style.form__input__file__legend__error) ||
                  Style.form__input__file__legend
                }
              >
                Arquivo *
              </InputLabel>
            </legend>
            <Input
              inputProps={{ accept: 'text/plain, application/pdf' }}
              id="file"
              type="file"
              hidden={true}
              onChange={handle.file}
              className={`${Style.form__input} ${Style.form__input__file__hidden}`}
              value={data.file}
            />
            <Typography
              className={
                (!!error.file && Style.form__input__file__name__error) ||
                Style.form__input__file__name
              }
            >
              {(data.file && getFileName()) || 'Nenhum arquivo'}
            </Typography>
            <Box className={Style.form__button}>
              <label htmlFor="file">
                <Button
                  variant="contained"
                  component="span"
                  className={data.file && Style.form__button__neutral}
                >
                  Upload
                </Button>
              </label>
            </Box>
          </fieldset>
        </Box>
      </Box>
      {success && (
        <Typography className={Style.form__success}>Ação concluída</Typography>
      )}
      <Box className={Style.form__button}>
        <Button variant="contained" disabled={!!validate()} type="submit">
          Salvar
        </Button>
      </Box>
      <Box className={Style.form__button}>
        <Link to="/tarefas" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            type="button"
            className={Style.form__button__neutral}
          >
            Voltar
          </Button>
        </Link>
      </Box>
    </form>
  );
}
