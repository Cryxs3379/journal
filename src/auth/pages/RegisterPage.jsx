import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import {Link as RouterLink } from 'react-router-dom'
import React, { useMemo, useState } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'


const formData = {
  email:'',
    password:'',
    displayName: ''
}
  const formValidations = {
    email: [(value) => value.includes('@'), 'El correo tiene que tener una @'],
    password: [(value) => value.length>=6,'El password debe de tener mas de 6 letras'],
    displayName: [(value) => value.length>=1,'El nombre es obligatorio'],
}

export const RegisterPage = () => {

const dispatch = useDispatch()
  const [formSubmitted, setformSubmitted] = useState(false)

const {status,errorMessage} = useSelector(state => state.auth) // esto para sacar el mensaje de error cuado no podemos crear por una cuenta existente

const isCheckingAuthentication = useMemo (()=> status === 'checking',[status])

  const {displayName,email,password,onInputChange,formState,displayNameValid,emailValid,passwordValid,isFormValid} = useForm(formData,formValidations)
  // console.log(displayNameValid)



const onSubmit = (event) => {
  event.preventDefault()
  setformSubmitted(true)
  if (!isFormValid) return;
dispatch(startCreatingUserWithEmailPassword(formState))
}


  return (
    //el grid es para poner un cuadrado en el medio de la pantalla
    <AuthLayout title='Register'> 
    {/* <h1>formvalid:{isFormValid ? 'valido' : 'incorrecto'}</h1> */}
  <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'> 

<Grid container>

  <Grid item xs={12} sx={{mt:2}}> 

  <TextField label='Nombre completo' type='text' placeholder='Tu Nombre' fullWidth name='displayName' value={displayName} onChange={onInputChange} error={!!displayNameValid && formSubmitted} helperText={displayNameValid} />
  {/* error={!displayNameValid} helperText={displayNameValid} */}
  </Grid>

  <Grid item xs={12} sx={{mt:2}}> 

  <TextField label='Correo' type='email' placeholder='correo@google.com' fullWidth name='email' value={email} onChange={onInputChange} error={!!emailValid && formSubmitted} helperText={emailValid}/>

  </Grid>
  
    <Grid item xs={12} sx={{mt:2}}> 

  <TextField label='Contraseña' type='password' placeholder='Contraseña' fullWidth name='password' value={password} onChange={onInputChange} error={!!passwordValid && formSubmitted} helperText={passwordValid}/>

    </Grid>

    <Grid container spacing={2} sx={{mb:2,mt:1}} > 


    <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
<Alert severity='error'>{errorMessage}</Alert>
    </Grid>



  <Grid item xs={12}>

  <Button type='submit'  variant='contained' fullWidth disabled={isCheckingAuthentication}>

    Crear una cuenta

  </Button>

  </Grid>
  
    </Grid>
    <Grid container direction='row' justifyContent='end'>
    <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
      <Link component={RouterLink} color='inherit' to='/auth/login'> 
      Ingresar 
      </Link>
      </Grid>

</Grid>

</form>



    </AuthLayout>
    

      
  )
}
