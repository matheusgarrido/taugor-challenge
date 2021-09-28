import { FormEvent, useEffect, useState } from 'react';

import { findDocument } from '../../middleware/Firebase/Firestore';
import { getFile } from '../../middleware/Firebase/Storage';

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

  return {
    data: { allTasks, allFiles },
  };
};

export default useTaskList;
