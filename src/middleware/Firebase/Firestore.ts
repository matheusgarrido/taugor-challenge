import { app } from './Firebase';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  documentId,
  updateDoc,
} from 'firebase/firestore';

// Firestore database
export const db = getFirestore(app);

//Insert a document
export const insertDocument = async (collectionName: string, data: Object) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (e) {
    return null;
  }
};

//Delete document
export const deleteDocument = async (collectionName: string, id: string) => {
  try {
    const q = query(
      collection(db, collectionName),
      where(documentId(), '==', id)
    );
    const querySnapshot = await getDocs(q);
    const { docs } = querySnapshot;
    await deleteDoc(docs[0].ref);
  } catch (e) {
    return null;
  }
};

//Update document
export const updateDocument = async (
  collectionName: string,
  id: string,
  data: any
) => {
  try {
    const q = query(
      collection(db, collectionName),
      where(documentId(), '==', id)
    );
    const querySnapshot = await getDocs(q);
    const { docs } = querySnapshot;
    const updated = await updateDoc(docs[0].ref, data);
    return updated;
  } catch (e) {
    return null;
  }
};

//Find Document with where
export const findDocument = async (
  collectionName: string,
  whereField: any,
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

export { documentId };
