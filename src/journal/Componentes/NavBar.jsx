import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';

// Componente de la barra de navegación
export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();

  // Maneja el cierre de sesión
  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar 
      position='fixed' 
      sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
    >
      <Toolbar>
        {/* Botón de menú para pantallas pequeñas */}
        <IconButton 
          color='inherit' 
          edge='start' 
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid 
          container 
          direction='row' 
          justifyContent='space-between' 
          alignItems='center'
        >
          <Typography variant='h6' component='div'>
            JournalApp
          </Typography>

          {/* Botón para cerrar sesión */}
          <IconButton color='error' onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
