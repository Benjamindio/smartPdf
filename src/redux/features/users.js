import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {
    userId:null,
    usage:null,
    embeddings:null
    },
};

export const usersSlice = createSlice({
 name: 'users',

  initialState,
 reducers: {
   login: (state, action) => {
     state.value.userId = action.payload.userId;
     state.value.usage = action.payload.usage;
     console.log(state.value.usage)
   },
   addEmbeddings: (state, action) => {
     state.value.embeddings = action.payload.embeddings;
     console.log(state.value.embeddings)
   },
   updateUsage:(state) => {
      state.value.usage -= 1
   }
   
 },
});

export const { login, addEmbeddings, addUrl , updateUsage} = usersSlice.actions;
export default usersSlice.reducer;