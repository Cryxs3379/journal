import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

// Componente para cada elemento de la barra lateral
export const SideBarItem = ({ title = '', body, id, date, imageUrl = [] }) => {
  const dispatch = useDispatch();

  // Maneja el clic en una nota de la barra lateral
  const onClickNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrl }));
  };

  // Memoriza el título nuevo para mostrarlo truncado si es muy largo
  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + '...'
      : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} /> {/* Título de la nota */}
          <ListItemText secondary={body} /> {/* Cuerpo de la nota */}
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

