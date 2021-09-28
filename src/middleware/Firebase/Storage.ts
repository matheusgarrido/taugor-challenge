import { app } from './Firebase';
import {
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
  getMetadata,
  listAll,
  connectStorageEmulator,
  list,
} from 'firebase/storage';

// Firestore database
export const storage = getStorage(app);

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

export const getFile = async (taskId: string) => {
  try {
    const path2 = `${taskId}/task-file.txt`;
    const txt = await getDownloadURL(ref(storage, path2));
    return txt;
  } catch (error) {
    const path = `${taskId}/task-file.pdf`;
    const pdf = await getDownloadURL(ref(storage, path));
    return pdf;
  }
};
