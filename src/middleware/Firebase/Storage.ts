import { app } from './Firebase';
import { getStorage, uploadBytes, ref, uploadString } from 'firebase/storage';

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
