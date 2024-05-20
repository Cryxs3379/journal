import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { NavBar } from '../Componentes/NavBar'
import { SideBar } from '../Componentes/SideBar'

const drawerWidth=280

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display:'flex'}} className='animate__animated animate__fadeIn animate__faster'>
        {/* navbar  draweWidth*/}
        <NavBar drawerWidth = {drawerWidth}/>
        {/* SIDEVAR */}
        <SideBar drawerWidth={drawerWidth}/>
    <Box component='main' sx={{flexGrow:1,p:1}}>  
        {/* Toolbal */}
        <Toolbar/>
        {children}
    
        </Box>
    </Box>
  )
}
