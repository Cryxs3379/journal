import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { JournalPage } from '../pages/JournalPage';

// Componente que define las rutas para la aplicación de diario
export const JournalRoutes = () => {
  return (
    <Routes>
      {/* Ruta principal para la página de diario */}
      <Route path='/' element={<JournalPage />} />
      {/* Redirige a la página principal si la ruta no coincide */}
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};

