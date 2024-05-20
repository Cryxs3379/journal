import React from 'react';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme/AppTheme';

// Componente principal de la aplicación de diario
export const JournalApp = () => {
  return (
    <AppTheme> {/* Aplica el tema a la aplicación */}
      <AppRouter /> {/* Configura las rutas de la aplicación */}
    </AppTheme>
  );
};

