import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FireBaseAuth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout } from '../store/auth/authSlice';
import { startLoadingNotes } from '../store/journal/thunks';

// Hook personalizado para verificar el estado de autenticación
export const useCheckOut = () => {
    const { status } = useSelector(state => state.auth); // Obtiene el estado de autenticación del store
    const dispatch = useDispatch();

    useEffect(() => {
        // Observa cambios en el estado de autenticación
        onAuthStateChanged(FireBaseAuth, async(user) => {
            if (!user) return dispatch(logout()); // Si no hay usuario, cerrar sesión

            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL })); // Iniciar sesión con los datos del usuario
            dispatch(startLoadingNotes()); // Cargar notas del usuario
        });
    }, []);

    return status; // Devuelve el estado de autenticación
};
