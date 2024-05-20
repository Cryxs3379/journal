import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FireBaseDB } from "../../firebase/config"
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNotes } from "./journalSlice"
import { loadNotes } from "../../helpers/loadNotes"
import { fileUpload } from "../../helpers/fileUpload"


export const startNewNote = () => {
//al poner el get state obtengo todos los state de redux, el usuario y las notas

return async(dispatch,getState) => {
    dispatch(savingNewNote())
    console.log(getState())

 const {uid} = getState().auth;
 console.log(uid)
    
    const newNote = {
        title: '',
        body: '',
        date: new Date().getTime(),
    }

     const newDoc = doc(collection(FireBaseDB,`${uid}/journal/notes`))
    const setDocResp = await setDoc(newDoc,newNote)

    newNote.id = newDoc.id
    //DISPATCHSSSSSSSSSSSS
        dispatch(addNewEmptyNote(newNote))
        
        dispatch(setActiveNote(newNote))
       
}

}
export const startLoadingNotes = () => {
    return async(dispatch,getState) => {
        const {uid} = getState().auth;
        if (!uid) throw new Error('el uid del usuario no existe');
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const startSavedNote = () => {
    return async(dispatch,getState) => {
        dispatch(setSaving())
        const {uid} = getState().auth;
        const {active:note} = getState().journal
        const noteToFirestore = { ...note}    
        delete noteToFirestore.id
        console.log(noteToFirestore)
        const docRef = doc(FireBaseDB,`${uid}/journal/notes/${note.id}`)
        await setDoc(docRef,noteToFirestore, {merge:true})
        dispatch(updateNotes(note))
}}
export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving())
        await fileUpload(files[0])
    }
}