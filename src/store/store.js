import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { journalSlice } from './journal/journalSlice';

// Configura el store de Redux con los reducers de autenticación y diario
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,     // Reducer para la autenticación
    journal: journalSlice.reducer // Reducer para el diario
  },
});
