import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React, { useMemo, useState } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

// Datos iniciales del formulario
const formData = {
  email: '',
  password: '',
  displayName: ''
};

// Validaciones del formulario
const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe contener una @'],
  password: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
};

export const RegisterPage = () => {
  const dispatch = useDispatch(); // Permite enviar acciones a Redux
  const [formSubmitted, setFormSubmitted] = useState(false); // Estado para controlar si el formulario fue enviado

  // Obtener el estado de autenticación y mensaje de error desde Redux
  const { status, errorMessage } = useSelector((state) => state.auth); 
  // Memoización para verificar si el estado es 'checking'
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  // Utilizar el hook personalizado useForm para manejar el formulario
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid
  } = useForm(formData, formValidations);

  // Maneja el envío del formulario
  const onSubmit = (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setFormSubmitted(true); // Indicar que el formulario fue enviado
    if (!isFormValid) return; // Si el formulario no es válido, salir
    dispatch(startCreatingUserWithEmailPassword(formState)); // Enviar acción a Redux para crear usuario
  };

  return (
    <AuthLayout title="Register"> {/* Componente de layout con título 'Register' */}
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        {/* Formulario con animación */}
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* Campo de texto para el nombre completo */}
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Tu Nombre"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* Campo de texto para el correo electrónico */}
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* Campo de texto para la contraseña */}
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              {/* Mensaje de error si no se puede crear la cuenta */}
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              {/* Botón para crear una cuenta */}
              <Button type="submit" variant="contained" fullWidth disabled={isCheckingAuthentication}>
                Crear una cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            {/* Enlace para ingresar si ya tienes cuenta */}
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
