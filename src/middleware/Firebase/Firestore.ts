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

//Find Document with where
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

//Get all documents
export const getAllDocuments = async (collectionName: string) => {
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);
  let documents: any[] = [];
  querySnapshot.forEach((doc) => {
    const { id } = doc;
    const data = doc.data();
    documents.push({ id, ...data });
  });
  return documents;
};
