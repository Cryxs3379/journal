import { collection } from 'firebase/firestore/lite';
import { getDocs } from 'firebase/firestore/lite';
import { FireBaseDB } from '../firebase/config';

// Función para cargar notas desde Firestore
export const loadNotes = async(uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe'); // Verifica si el UID está presente

    const collectionRef = collection(FireBaseDB, `${uid}/journal/notes`); // Referencia a la colección de notas
    const docs = await getDocs(collectionRef); // Obtiene los documentos de la colección

    const notes = [];

    docs.forEach(doc => {
        // Agrega cada nota al arreglo de notas con su ID
        notes.push({ id: doc.id, ...doc.data() });
    });

    return notes; // Devuelve las notas
};
