import { Grid, Typography } from '@mui/material';
import React from 'react';

// Componente de diseño para las páginas de autenticación.
export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid 
      container 
      spacing={0} 
      direction='column' 
      alignItems='center' 
      justifyContent='center' 
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      {/* Contenedor del formulario con sombra y estilo */}
      <Grid 
        item 
        className='box-shadow' 
        xs={3} 
        sx={{ width: { md: 450 }, backgroundColor: 'white', padding: 3, borderRadius: 2 }}
      >
        {/* Título de la página */}
        <Typography variant='h5' sx={{ mb: 1 }}>
          {title}
        </Typography>
        {/* Contenido hijo (formularios de login/registro) */}
        {children}
      </Grid>
    </Grid>
  );
};
