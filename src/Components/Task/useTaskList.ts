import { useEffect, useState } from 'react';

import { findDocument } from '../../middleware/Firebase/Firestore';
import { getFile, deleteFile } from '../../middleware/Firebase/Storage';
import { deleteDocument } from '../../middleware/Firebase/Firestore';

interface ITask {
  title: string;
  description: string;
  status: string;
  responsible: string;
  id: string;
}

interface IProps {
  id: string;
}

const useTaskList = ({ id }: IProps) => {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [allFiles, setAllFiles] = useState<string[]>([]);
  const getAllTasks = async () => {
    const tasks = await findDocument('tasks', 'responsible', id);
    tasks.sort((a, b) => a.title.localeCompare(b.title));
    setAllTasks(tasks);
  };
  const getAllFiles = async () => {
    const files = await Promise.all(
      allTasks.map(async ({ id }) => {
        const file: string = await getFile(id);
        return file;
      })
    );
    setAllFiles(files);
  };
  useEffect(() => {
    getAllTasks();
  }, []);
  useEffect(() => {
    getAllFiles();
  }, [allTasks]);

  const handle = {
    deleteTask: async (id: string) => {
      await deleteFile(id);
      await deleteDocument('tasks', id);
      const index = allTasks.findIndex((task) => task.id == id);
      if (index > -1) {
        const tasks = allTasks.filter((task, i) => i !== index);
        setAllTasks(tasks);
        const files = allFiles.filter((task, i) => i !== index);
        setAllFiles(files);
      }
    },
  };

  return {
    data: { allTasks, allFiles },
    handle,
  };
};

export default useTaskList;
