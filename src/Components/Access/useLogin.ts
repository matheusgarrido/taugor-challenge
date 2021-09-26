import { FormEvent, useState } from 'react';
import { userRegister } from '../../Models/Register';

const handleData = (event: FormEvent) => {
  const { value, id } = event.target as HTMLInputElement;
  return { value, id };
};

type Field = 'name' | 'username' | 'email' | 'password';

const useLogin = (type: 'register' | 'login' | 'reset') => {
  //Input states
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Errors
  const [errorField, setErrorField] = useState('');
  const [error, setError] = useState('');

  // Set state for error
  function verifyErrors() {
    const error = validate();
    if (error) {
      const { details } = error;
      details.map((err: any) => {
        const { key, limit }: { key: Field; limit: number } = err.context;
        if (err.type === 'string.min') {
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
