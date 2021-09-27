import { FormEvent, useEffect, useState } from 'react';
import {
  getAllDocuments,
  insertDocument,
} from '../../middleware/Firebase/Firestore';
import { SelectChangeEvent } from '@mui/material';
import { taskForm } from '../../Models/Task';

interface IUser {
  name: string;
  id: string;
  username: string;
}
interface IProps {
  title: string;
  status: string;
  description: string;
  responsible: string;
  file: string;
  type: 'new' | 'update';
}

const useTaskForm = (props: IProps) => {
  //Arrays to selects
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const getUsers = async () => {
    const docs = await getAllDocuments('users');
    const filterDocs = docs
      .map((doc) => {
        const { name, username, authId } = doc;
        return { name, username, id: authId };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    setAllUsers(filterDocs);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const allStatus = ['Pendente', 'Em andamento', 'Finalizada', 'Cancelada'];
  //Fields values
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [status, setStatus] = useState(props.status);
  const [file, setFile] = useState(props.file);
  const [responsible, setResponsible] = useState(props.responsible);

  //Empty file error
  const [emptyFile, setEmptyFile] = useState(false);
  //Success
  const [success, setSuccess] = useState(false);

  const handleTitle = (event: FormEvent) => {
    const { value } = event.target as HTMLInputElement;
    setTitle(value);
    setSuccess(false);
  };
  const handleDescription = (event: FormEvent) => {
    const { value } = event.target as HTMLInputElement;
    setDescription(value);
    setSuccess(false);
  };
  const handleStatus = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setStatus(value);
    setSuccess(false);
  };
  const handleResponsible = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setResponsible(value);
    setSuccess(false);
  };
  const handleFile = (event: FormEvent) => {
    const { value } = event.target as HTMLInputElement;
    setFile(value);
    setEmptyFile(false);
    setSuccess(false);
  };
  const handleReset = () => {
    setTitle('');
    setDescription('');
    setStatus('');
    setResponsible('');
    setFile('');
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) {
      setEmptyFile(true);
      return;
    }
    switch (props.type) {
      case 'new':
        const task = await insertDocument('tasks', {
          title,
          description,
          status,
          responsible,
        });
        setSuccess(true);
        handleReset();
        break;
    }
  };

  //Verify form
  function validate() {
    let data: any = {};
    switch (props.type) {
      case 'new':
        data = taskForm({
          title,
          description,
          status,
          file,
          responsible,
        });
        break;
    }
    if (data.error) {
      return data.error;
    }
    return false;
  }

  return {
    data: {
      title,
      description,
      status,
      file,
      responsible,
    },
    error: {
      file: emptyFile,
    },
    selectOptions: {
      allStatus,
      allUsers,
    },
    handle: {
      title: handleTitle,
      description: handleDescription,
      status: handleStatus,
      file: handleFile,
      responsible: handleResponsible,
      submit: handleSubmit,
    },
    success,
    validate,
  };
};

export default useTaskForm;
