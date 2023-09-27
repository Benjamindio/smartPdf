import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {
    userId:null
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
 },
});

export const { login } = usersSlice.actions;
export default usersSlice.reducer;