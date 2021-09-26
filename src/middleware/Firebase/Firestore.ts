import { app } from './Firebase';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

// Firestore database
export const db = getFirestore(app);

export const insertDocument = async (collectionName: string, data: Object) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (e) {
    return null;
  }
};

export const findDocument = async (
  collectionName: string,
  whereField: string,
  whereData: any
) => {
  const q = query(
    collection(db, collectionName),
    where(whereField, '==', whereData)
  );
  const querySnapshot = await getDocs(q);
  let documents: any[] = [];
  querySnapshot.forEach((doc) => {
    const { id } = doc;
    const data = doc.data();
    documents.push({ id, ...data });
  });
  return documents;
};

// matheusgarrido10@hotmail.com

// if (!error) insertDocument('users', { email, password, name, username });
