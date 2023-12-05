import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    addUser(state, action) {
      //   state.user.push(action.payload);
      state.user = action.payload ?? {};
    },
    logoutUser(state) {
      state.user = {};
    },  
  },
});

export const { addUser,logoutUser } = userSlice.actions;
export default userSlice.reducer;
