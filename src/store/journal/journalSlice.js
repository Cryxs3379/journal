import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
    // Ejemplo de estado activo de una nota:
    // active: {
    //     id: 'abc123',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imageUrl: [] //https://photo1.jpg, https://photo2.jpg, etc.
    // }
  },
  // Reducers son las acciones que se llamarán desde thunks
  reducers: {
    // Marca el estado como guardando una nueva nota
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    // Agrega una nueva nota vacía al array de notas y desmarca el estado de guardado
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    // Establece la nota activa y limpia el mensaje de guardado
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    // Establece las notas obtenidas desde la base de datos
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    // Marca el estado como guardando
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    // Actualiza una nota existente y establece un mensaje de éxito
    updateNotes: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    // Elimina una nota por su ID
    deleteNoteById: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
  },
});

// Creadores de acciones generados para cada función reductora
export const { 
  addNewEmptyNote, 
  setActiveNote, 
  setNotes, 
  setSaving, 
  updateNotes, 
  deleteNoteById, 
  savingNewNote 
} = journalSlice.actions;
