import { AddOutlined, MailOutline } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedViews } from '../../views/NothingSelectedViews'
import { NoteView } from '../../views/NoteView'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'

export const JournalPage = () => {
const dispatch = useDispatch()
const {isSaving,active} = useSelector (state => state.journal)

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }
  return (

    <JournalLayout>
    {/* <Typography>gfdfgdfhdfbdbddf hfui suifhidshfihds ifhidshfihdsiuhfuihsui hfuidshf i</Typography> */}

    {
        (!!active)
        ?<NoteView/>
        :<NothingSelectedViews/>
    }
    
     {/* <NoteView/>  */}
   {/* <NothingSelectedViews/> */}

<IconButton disabled={isSaving} onClick={onClickNewNote} size='large' sx={{color:'white',backgroundColor:'error.main',':hover': {backgroundColor:'error.main',opacity:0.9}, position:'fixed', right:50,bottom:50} }>
<AddOutlined sx={{fontSize:30}}/>
</IconButton>

    </JournalLayout>

  )
}
