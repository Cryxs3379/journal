import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { FireBaseAuth } from "./config";

// Proveedor de Google para autenticación
const googleProvider = new GoogleAuthProvider();

// Función para iniciar sesión con Google
export const singInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FireBaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;
        return { 
            ok: true,
            displayName, email, photoURL, uid // Información del usuario
        };
    } catch (error) {
        return { 
            ok: false 
        };
    }
};

// Función para iniciar sesión con email y contraseña
export const LoginWithEmailAndPasword = async({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(FireBaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;
        return {
            ok: true,
            uid, photoURL, displayName
        };
    } catch (error) {
        return { 
            ok: false, errorMessage: error.message 
        };
    }
};

// Función para registrar un usuario con email y contraseña
export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FireBaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        await updateProfile(FireBaseAuth.currentUser, { displayName });
        return {
            ok: true,
            uid, photoURL, email, displayName
        };
    } catch (error) {
        return { 
            ok: false, errorMessage: error.message 
        };
    }
};

// Función para cerrar sesión
export const logoutFirebase = async () => {
    return await FireBaseAuth.signOut();
};
