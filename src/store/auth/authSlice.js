import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
         name: 'auth',
         initialState: {
         status: 'checking',//not authetificated, autentificated
         uid: null,
         email:null,
         displayname:null,
         photoURL:null,
         errorMessage:null

},
reducers: {
       login: (state,{payload}) => {
        state.status = 'authenticated',
   state.uid= payload.uid,
   state.email=payload.email,
   state.displayname=payload.displayName,
   state.photoURL=payload.photoURL,
   state.errorMessage=null

},
logout: (state,{payload}) => {
    state.status = 'not authenticated',
   state.uid= null,
   state.email=null,
   state.displayname=null,
   state.photoURL=null,
   state.errorMessage=payload?.errorMessage
},

checkingCredential: (state) => {
state.status = "checking"
},

}
});
// Action creators are generated for each case reducer function
export const { login,logout,checkingCredential } = authSlice.actions;