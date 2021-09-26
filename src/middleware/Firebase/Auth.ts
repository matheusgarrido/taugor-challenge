import { app } from './Firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Firestore database
export const auth = getAuth(app);

export const createUser = async (email: string, password: string) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    return null;
  }
};
