import { FormEvent, useEffect, useState } from 'react';
import {
  findDocument,
  getAllDocuments,
  insertDocument,
  updateDocument,
  documentId,
} from '../../middleware/Firebase/Firestore';
import { uploadFile } from '../../middleware/Firebase/Storage';
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
  id: string;
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
  const [file, setFile] = useState<File>();
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
  const handleFile = async (event: FormEvent) => {
    const { value, files } = event.target as HTMLInputElement;
    if (files) {
      await setFile(files[0]);
      setEmptyFile(false);
      setSuccess(false);
    }
  };
  const handleReset = () => {
    setTitle('');
    setDescription('');
    setStatus('');
    setResponsible(props.responsible);
    setFile(undefined);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    switch (props.type) {
      case 'new':
        if (!file) {
          setEmptyFile(true);
          return;
        }
        const taskId = await insertDocument('tasks', {
          title,
          description,
          status,
          responsible,
        });
        if (taskId) {
          await uploadFile(file, taskId);
          handleReset();
          setSuccess(true);
        }
        break;
      case 'update':
        const updates: string[] = [];
        const doc = (await findDocument('tasks', documentId(), props.id))[0];
        const user = (
          await findDocument('users', 'authId', doc.responsible)
        )[0];
        const now = new Date();
        if (!!file) {
          await uploadFile(file, props.id);
          setFile(undefined);
          setSuccess(true);
          updates.push(
            `${user.name} (${user.username}) substituiu o arquivo # ${now}`
          );
        }
        if (doc.title !== title) {
          updates.push(
            `${user.name} (${user.username}) atualizou o título que estava anteriormente como "${doc.title}" # ${now}`
          );
        }
        if (doc.description !== description) {
          updates.push(
            `${user.name} (${user.username}) atualizou a descrição que estava anteriormente como "${doc.description}" # ${now}`
          );
        }
        if (doc.status !== status) {
          updates.push(
            `${user.name} (${user.username}) atualizou o status que estava anteriormente como "${doc.status}" # ${now}`
          );
        }
        if (doc.responsible !== responsible) {
          const newResponsible = (
            await findDocument('users', 'authId', responsible)
          )[0];
          updates.push(
            `${user.name} (${user.username}) atribuiu a responsabilidade para ${newResponsible.name} (${newResponsible.username}) # ${now}`
          );
        }
        if (updates.length) {
          const updateInfo = !!doc.updateInfo
            ? [...updates, ...doc.updateInfo]
            : updates;
          await updateDocument('tasks', props.id, {
            title,
            description,
            status,
            responsible,
            updateInfo,
          });
        }
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
          responsible,
        });
        break;
    }
    if (data.error) {
      return data.error;
    }
    if (!file && props.type == 'new') return true;
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
