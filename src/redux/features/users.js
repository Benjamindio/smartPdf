import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {
    userId:null,
    
    embeddings:null
    },
};

export const usersSlice = createSlice({
 name: 'users',

  initialState,
 reducers: {
   login: (state, action) => {
     state.value.userId = action.payload.userId;
     console.log(state.value.userId)
   },
   addEmbeddings: (state, action) => {
     state.value.embeddings = action.payload.embeddings;
     console.log(state.value.embeddings)
   },
   
 },
});

export const { login, addEmbeddings, addUrl } = usersSlice.actions;
export default usersSlice.reducer;