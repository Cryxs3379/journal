import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import React from 'react';
import { purpleTheme } from './purpleTheme';

// Componente para aplicar el tema a la aplicación
export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}> {/* Proveedor de tema */}
      <CssBaseline /> {/* Restablece el CSS para mantener la consistencia en los estilos */}
      {children} {/* Contenido de la aplicación */}
    </ThemeProvider>
  );
};
