import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';
import { ImageGallery } from '../journal/Componentes/ImageGallery';
import { useForm } from '../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../store/journal/journalSlice';
import { startSavedNote, startUploadingFiles } from '../store/journal/thunks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

// Vista para mostrar y editar una nota
export const NoteView = () => {
  const dispatch = useDispatch();

  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal); // Obtiene la nota activa y estados relacionados

  const { body, title, onInputChange, formState, date } = useForm(note); // Utiliza el hook personalizado para manejar el formulario

  // Memoriza la fecha en formato UTC
  const DateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState)); // Actualiza la nota activa cuando cambia el formulario
  }, [formState, dispatch]);

  const fileInputRef = useRef(); // Referencia para el input de archivos

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success'); // Muestra una alerta cuando la nota se actualiza
    }
  }, [messageSaved]);

  // Maneja el guardado de la nota
  const onSaveNote = () => {
    dispatch(startSavedNote());
  };

  // Maneja el cambio de archivos para subir
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  return (
    <Grid 
      className='animate__animated animate__fadeIn animate__faster' 
      container 
      direction='row' 
      justifyContent='space-between' 
      sx={{ mb: 1 }} 
      alignItems='center'
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{DateString}</Typography>
      </Grid>

      <Grid item>
        <input 
          type='file' 
          multiple 
          ref={fileInputRef} 
          onChange={onFileInputChange} 
          style={{ display: 'none' }} 
        />
        <IconButton 
          color='primary' 
          disabled={isSaving} 
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button 
          disabled={isSaving} 
          onClick={onSaveNote} 
          color='primary' 
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField 
          type='text' 
          variant='filled' 
          fullWidth 
          placeholder='Ingrese un título' 
          label='Título' 
          sx={{ border: 'none', mb: 1 }} 
          name='title' 
          value={title} 
          onChange={onInputChange} 
        />
        <TextField 
          type='text' 
          variant='filled' 
          fullWidth 
          placeholder='¿Qué sucedió hoy?' 
          multiline 
          minRows={5} 
          sx={{ border: 'none', mb: 1 }} 
          name='body' 
          value={body} 
          onChange={onInputChange} 
        />
      </Grid>

      {/* Galería de imágenes */}
      <ImageGallery />
    </Grid>
  );
};
