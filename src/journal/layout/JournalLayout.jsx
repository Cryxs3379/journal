import { Box, Toolbar } from '@mui/material';
import React from 'react';
import { NavBar } from '../Componentes/NavBar';
import { SideBar } from '../Componentes/SideBar';

const drawerWidth = 280;

// Componente de diseño para la aplicación de diario
export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>
      {/* Barra de navegación */}
      <NavBar drawerWidth={drawerWidth} />
      {/* Barra lateral */}
      <SideBar drawerWidth={drawerWidth} />
      <Box component='main' sx={{ flexGrow: 1, p: 1 }}>
        {/* Espaciador de la barra de herramientas */}
        <Toolbar />
        {children} {/* Contenido principal */}
      </Box>
    </Box>
  );
};
