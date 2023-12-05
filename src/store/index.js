import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import noteSlice from "./slices/note.slice";

export const store = configureStore({
  reducer: {
    userSlice,
    noteSlice,
  },
});
