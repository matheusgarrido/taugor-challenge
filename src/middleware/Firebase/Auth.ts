import { app } from './Firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// Firestore database
export const auth = getAuth(app);

//Sign up
export const authCreate = async (email: string, password: string) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    return null;
  }
};

//Sign in
export const authLogin = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    return null;
  }
};

export const authLogout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    return null;
  }
};
