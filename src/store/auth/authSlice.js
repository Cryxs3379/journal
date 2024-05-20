import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // Estado de verificación, no autenticado, autenticado
    uid: null,
    email: null,
    displayname: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    // Reducer para el login
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayname = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    // Reducer para el logout
    logout: (state, { payload }) => {
      state.status = 'not authenticated';
      state.uid = null;
      state.email = null;
      state.displayname = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
    },
    // Reducer para verificar las credenciales
    checkingCredential: (state) => {
      state.status = 'checking';
    },
  }
});

// Creadores de acciones generados para cada función reductora
export const { login, logout, checkingCredential } = authSlice.actions;
