import { Google } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React, { useMemo } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { checkingAutentification, startGoogleSignIn, startLoginWithEmailAndPasword } from '../../store/auth/thunks';

const formData = { 
  email: '',
  password: ''
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);
  const { email, password, onInputChange } = useForm(formData);
  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailAndPasword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title='Login'> {/* Título de la página de inicio de sesión */}
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* Campo de texto para el correo electrónico */}
            <TextField 
              label='Correo' 
              type='email' 
              placeholder='correo@google.com' 
              fullWidth 
              name='email' 
              onChange={onInputChange} 
              value={email} 
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* Campo de texto para la contraseña */}
            <TextField 
              label='Contraseña' 
              type='password' 
              placeholder='Contraseña' 
              fullWidth 
              name='password' 
              onChange={onInputChange} 
              value={password} 
            />
          </Grid>
          <Grid container display={!!errorMessage ? '' : 'none'} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              {/* Mensaje de error si ocurre algún problema */}
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              {/* Botón de inicio de sesión */}
              <Button type='submit' variant='contained' fullWidth disabled={isAuthenticated}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Botón para iniciar sesión con Google */}
              <Button onClick={onGoogleSignIn} variant='contained' fullWidth disabled={isAuthenticated}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            {/* Enlace para crear una cuenta nueva */}
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
