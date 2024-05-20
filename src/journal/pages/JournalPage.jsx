import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedViews } from '../../views/NothingSelectedViews';
import { NoteView } from '../../views/NoteView';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';

// Componente principal de la página de diario
export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal); // Obtiene el estado de guardado y la nota activa

  // Maneja la creación de una nueva nota
  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {/* Si hay una nota activa, muestra NoteView, de lo contrario muestra NothingSelectedViews */}
      {!!active ? <NoteView /> : <NothingSelectedViews />}

      {/* Botón para agregar una nueva nota */}
      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};

