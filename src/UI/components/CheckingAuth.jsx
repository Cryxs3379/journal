import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

// Componente que muestra un indicador de carga mientras se verifica la autenticación
export const CheckingAuth = () => {
  return (
    <Grid 
      container 
      spacing={0} 
      direction='column' 
      alignItems='center' 
      justifyContent='center' 
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid container direction='row' justifyContent='center'>
        <CircularProgress color='warning' /> {/* Indicador de progreso circular */}
      </Grid>
    </Grid>
  );
};
