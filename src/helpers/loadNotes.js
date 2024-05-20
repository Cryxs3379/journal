import { collection } from 'firebase/firestore/lite';
import React from 'react'
import { FireBaseDB } from '../firebase/config';
import { getDocs } from 'firebase/firestore/lite';
//este componente, va a firestore y me trae todas las notas
export const loadNotes = async(uid='') => {
    if (!uid) throw new Error('el uid del usuario no existe');

    const collectionRef = collection(FireBaseDB,`${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)

    const notes = []

    docs.forEach(doc=>{
        // console.log(doc.data()) aqui se ven los id y las notas
        notes.push({id:doc.id,...doc.data()})
    })
        console.log(notes)
        return notes
    

}
