import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNotes } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

// Acción para crear una nueva nota
export const startNewNote = () => {
  return async(dispatch, getState) => {
    dispatch(savingNewNote()); // Marca el estado como guardando
    const { uid } = getState().auth; // Obtiene el UID del usuario

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FireBaseDB, `${uid}/journal/notes`)); // Crea una nueva referencia de documento
    await setDoc(newDoc, newNote); // Guarda la nueva nota en Firestore

    newNote.id = newDoc.id; // Añade el ID del documento a la nota
    dispatch(addNewEmptyNote(newNote)); // Añade la nueva nota vacía al estado
    dispatch(setActiveNote(newNote)); // Establece la nueva nota como activa
  };
};

// Acción para cargar las notas del usuario
export const startLoadingNotes = () => {
  return async(dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe');
    const notes = await loadNotes(uid); // Carga las notas desde Firestore
    dispatch(setNotes(notes)); // Establece las notas en el estado
  };
};

// Acción para guardar una nota
export const startSavedNote = () => {
  return async(dispatch, getState) => {
    dispatch(setSaving()); // Marca el estado como guardando
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id; // Elimina el ID de la nota antes de guardarla
    const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true }); // Guarda la nota en Firestore
    dispatch(updateNotes(note)); // Actualiza la nota en el estado
  };
};

// Acción para subir archivos
export const startUploadingFiles = (files = []) => {
  return async(dispatch) => {
    dispatch(setSaving()); // Marca el estado como guardando
    await fileUpload(files[0]); // Sube el primer archivo
  };
};
