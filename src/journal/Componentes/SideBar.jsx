import { TurnedInNot } from '@mui/icons-material';
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

// Componente de la barra lateral
export const SideBar = ({ drawerWidth = 100 }) => {
  const { displayname } = useSelector(state => state.auth); // Obtiene el nombre de usuario del estado
  const { notes } = useSelector(state => state.journal); // Obtiene las notas del estado

  return (
    <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer 
        variant='permanent' 
        open 
        sx={{ display: { xs: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            {displayname} {/* Muestra el nombre de usuario */}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map(note => (
            <SideBarItem key={note.id} {...note} /> // Muestra cada nota en la barra lateral
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
