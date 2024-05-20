import { SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { ImageGallery } from '../journal/Componentes/ImageGallery'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote } from '../store/journal/journalSlice'
import { startSavedNote, startUploadingFiles } from '../store/journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

const dispatch = useDispatch()

const {active:note,messageSaved,isSaving} = useSelector(state => state.journal) //active ahora se llama note

const {body,title,onInputChange,formState,date} = useForm(note)

const DateString = useMemo(()=> {
  const newdate = new Date(date)
  return newdate.toUTCString()
},[date])

useEffect(() => {
  dispatch(setActiveNote(formState))

}, [formState])

const fileInputRef = useRef()

useEffect(() => {
  if ( messageSaved.length > 0){
    Swal.fire('nota actualizada',messageSaved, 'success')
  }

}, [messageSaved])


const onSaveNote = () => {
  dispatch(startSavedNote())
}
const onFileInputChange = ({target}) => {
  if (target.files===0)return
  
  dispatch(startUploadingFiles(target.files))

}

  return (
    <Grid className='animate__animated animate__fadeIn animate__faster' container direction='row' justifyContent='space-between' sx={{mb:1}} alignItems='center'>
    <Grid item>
<Typography fontSize={39} fontWeight='light'>{DateString}</Typography>
    </Grid>


    <Grid item>

    <input type='file' multiple ref={fileInputRef} onChange={onFileInputChange} style={{display:'none'}}/>

    <IconButton color='primary' disabled={isSaving} onClick={() => fileInputRef.current.click()} >
      <UploadOutlined />
    </IconButton>

    <Button disabled={isSaving} onClick={onSaveNote} color='primary' sx={{padding:2}}>
       <SaveOutlined sx={{fontSize:30,mr:1}}/>
        Guardar
    </Button>
    </Grid>


    <Grid container>
<TextField type='text' variant='filled' fullWidth placeholder='Ingrese un titulo' label='titulo' sx={{border:'none',mb:1}}name='title' value={title} onChange={onInputChange}/>
<TextField type='text' variant='filled' fullWidth placeholder='¿Que sucedio hoy?' multiline minRows={5} sx={{border:'none',mb:1}} name='body' value={body} onChange={onInputChange}/>
    </Grid>
    {/* image gallery */}
    <ImageGallery/>
    </Grid>

 
  )
}
