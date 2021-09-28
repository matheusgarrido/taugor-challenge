import { app } from './Firebase';
import {
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

// Firestore database
export const storage = getStorage(app);

//Upload a file
export const uploadFile = async (file: File, taskId: string) => {
  try {
    if (file) {
      const extension = file.type === 'application/pdf' ? 'pdf' : 'txt';
      const path = `${taskId}/task-file.${extension}`;
      const storageRef = ref(storage, path);
      const uploaded = await uploadBytes(storageRef, file);
      return uploaded;
    }
  } catch (error) {
    return null;
  }
};

//Get a file
export const getFile = async (taskId: string) => {
  try {
    const path = `${taskId}/task-file.pdf`;
    const pdf = await getDownloadURL(ref(storage, path));
    return pdf;
  } catch (error) {
    const path = `${taskId}/task-file.txt`;
    const txt = await getDownloadURL(ref(storage, path));
    return txt;
  }
};

//Delete a file
export const deleteFile = async (taskId: string) => {
  try {
    const path = `${taskId}/task-file.pdf`;
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    const path = `${taskId}/task-file.txt`;
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  }
};
