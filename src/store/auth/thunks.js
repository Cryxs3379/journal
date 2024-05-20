import { LoginWithEmailAndPasword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredential, login, logout } from "./authSlice";

// Acción para verificar las credenciales de autenticación
export const checkingAutentification = () => {
  return async(dispatch) => {
    dispatch(checkingCredential());
  };
};

// Acción para iniciar sesión con Google
export const startGoogleSignIn = () => {
  return async(dispatch) => {
    dispatch(checkingCredential());
    const result = await singInWithGoogle();
    if (!result.ok) 
      return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};

// Acción para registrar un usuario con email y contraseña
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async(dispatch) => {
    dispatch(checkingCredential());
    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
    if (!ok) 
      return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

// Acción para iniciar sesión con email y contraseña
export const startLoginWithEmailAndPasword = ({ email, password }) => {
  return async(dispatch) => {
    dispatch(checkingCredential());
    const result = await LoginWithEmailAndPasword({ email, password });
    if (!result.ok) 
      return dispatch(logout(result));
    dispatch(login(result));
  };
};

// Acción para cerrar sesión
export const startLogout = () => {
  return async(dispatch) => {
    await logoutFirebase();
    dispatch(logout({}));
  };
};
