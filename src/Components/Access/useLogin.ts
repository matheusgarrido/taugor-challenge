import { FormEvent, useState } from 'react';
import {
  findDocument,
  insertDocument,
} from '../../middleware/Firebase/Firestore';
import { createUser } from '../../middleware/Firebase/Auth';
import { userRegister } from '../../Models/Register';

const handleData = (event: FormEvent) => {
  const { value, id } = event.target as HTMLInputElement;
  return { value, id };
};

type FieldType = 'name' | 'username' | 'email' | 'password';
type PageType = 'register' | 'login' | 'reset';

const useLogin = (type: PageType) => {
  //Input states
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Errors
  const [errorField, setErrorField] = useState('');
  const [error, setError] = useState('');
  const newError = (field: string, message: string) => {
    setErrorField(field);
    setError(message);
  };

  // Set state for error
  function verifyErrors() {
    const error = validate();
    if (error) {
      const { details } = error;
      details.map((err: any) => {
        if (err.type === 'string.min') {
          const { key, limit }: { key: FieldType; limit: number } = err.context;
          setError(`Mínimo de ${limit} caracteres`);
          setErrorField(key);
        }
      });
    }
  }

  //Verify form
  function validate() {
    let data: any = {};
    switch (type) {
      case 'register':
        data = userRegister({ email, password, name, username });
        break;
    }
    if (data.error) {
      return data.error;
    }
    return false;
  }

  //Handle Form
  const handle = {
    submit: async (event: FormEvent) => {
      event.preventDefault();
      verifyErrors();
      if (error) return;
      switch (type) {
        //User register
        case 'register':
          //Same username
          const duplicatedUsername = await findDocument(
            'users',
            'username',
            username
          );
          if (duplicatedUsername.length) {
            newError('username', 'Nome de usuário em uso por outro usuário');
            return;
          }
          //Same email
          const duplicatedEmail = await findDocument('users', 'email', email);
          if (duplicatedEmail.length) {
            newError('email', 'Email em uso por outro usuário');
            return;
          }
          //Save new user
          const newUser = await createUser(email, password);
          const authId = newUser?.user.uid;
          if (authId) {
            const docId = await insertDocument('users', {
              email,
              username,
              name,
              authId,
            });
            if (docId) {
              const URL = process.env.REACT_APP_URL_BASE;
              window.location.href = URL + '/tarefas';
            }
          }
          break;
      }
    },
    data: (event: FormEvent) => {
      const { value, id } = handleData(event);
      setError('');
      setErrorField('');
      switch (id) {
        case 'name':
          setName(value);
          break;
        case 'username':
          setUsername(value);
          break;
        case 'email':
          setEmail(value);
          break;
        case 'password':
          setPassword(value);
          break;
      }
    },
  };

  return {
    data: { email, password, username, name },
    error: { message: error, field: errorField },
    handle,
    validate,
  };
};

export default useLogin;
