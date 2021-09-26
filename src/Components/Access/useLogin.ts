import { FormEvent, useState } from 'react';

const handleData = (event: FormEvent) => {
  const { value, id } = event.target as HTMLInputElement;
  return { value, id };
};

const useLogin = (type: 'register' | 'login' | 'reset') => {
  //Input states
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Errors
  let error = { email: '', password: '', name: '', username: '' };

  function unlockButton(): boolean {
    function verifyPassword() {
      return password.length >= 6;
    }
    function verifyUsername() {
      return password.length >= 4;
    }
    switch (type) {
      case 'register':
        return !email || !verifyPassword() || !name || !verifyUsername();
      case 'login':
        return !email || !verifyPassword();
    }
    return false;
  }

  //Handle Form
  const handle = {
    submit: async (event: FormEvent) => {
      event.preventDefault();
    },
    data: (event: FormEvent) => {
      const { value, id } = handleData(event);
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
    error,
    handle,
    unlockButton,
  };
};

export default useLogin;
