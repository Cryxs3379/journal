import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

// Componente que define las rutas de autenticación.
export const AuthRoutes = () => {
  return (
    <Routes>
      {/* Ruta para la página de inicio de sesión */}
      <Route path='login' element={<LoginPage />} />
      {/* Ruta para la página de registro */}
      <Route path='register' element={<RegisterPage />} />
      {/* Redirige a login si la ruta no coincide */}
      <Route path='/*' element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
