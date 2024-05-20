import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FireBaseAuth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { login, logout } from '../store/auth/authSlice'
import { startLoadingNotes } from '../store/journal/thunks'

export const useCheckOut = () => {
    const {status} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
      //funcion que emite valores, se dispara muchas veces
      onAuthStateChanged(FireBaseAuth,async(user)=> {
        if (!user) return dispatch(logout())

          const {uid,email,displayName,photoURL} = user
          dispatch(login({uid,email,displayName,photoURL}))
          dispatch(startLoadingNotes())

        // console.log(user)
      })
    }, [])
return status
}
