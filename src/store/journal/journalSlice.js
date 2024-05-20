import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
         name: 'journal',
         initialState: {
            isSaving:false,
            messageSaved: '',
            notes:[],
            active:null
            // active: {
            //     id:'abc123',
            //     title:'',
            //     body:'',
            //     date:1234567,
            //     imageUrl: [] //https://photo1.jpg,https://photo2.jpg.....
            // }
         
},

// aqui creo el primer state con los campos vacios, y los reducers son las acciones que vooy a hacer que se llaman desde thunks
reducers: {
    savingNewNote:(state) => {
      state.isSaving = true

    },
       addNewEmptyNote: (state,action) => {
        state.notes.push(action.payload)
        state.isSaving= false
       },
       setActiveNote:(state,action) => {
        state.active= action.payload
        state.messageSaved = ''

       },
       setNotes:(state,action) => {
        state.notes=action.payload

       },
       setSaving:(state) => {
        state.isSaving=true
        state.messageSaved = ''

       },
       updateNotes:(state,action) => {
        state.isSaving = false
        state.notes = state.notes.map(note => {
          if(note.id === action.payload.id) {
            return action.payload
          }
          return note
        })
            state.messageSaved = `${action.payload.title}, actualizada correctamente`
       },
       deleteNoteById:(state) => {


       },
},

});
// Action creators are generated for each case reducer function
export const { addNewEmptyNote,setActiveNote,setNotes,setSaving,updateNotes,deleteNoteById,savingNewNote } = journalSlice.actions;