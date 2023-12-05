import { createSlice } from "@reduxjs/toolkit";

const initialNotes = [
  // {
  //   id: "",
  //   author: "",
  //   taskText: "",
  //   date: "",
  //   status: "",
  //   progress: 0,
  //   assign: [],
  //   collaborators: [],
  // },
];

const noteSlice = createSlice({
  name: "note",
  initialState: { notes: initialNotes, originalNotes: initialNotes },
  reducers: {
    addNote(state, action) {
      state.notes?.push(action.payload);
      state.originalNotes?.push(action.payload);
    },
    addAssign(state, action) {
      const { id, email } = action.payload;
      const index = state.notes.findIndex((note) => note?.id === id);
      if (index !== -1) {
        state.notes[index].assign = [...state.notes[index].assign, email];
      }
    },
    addCollaborators(state, action) {
      const { id, email } = action.payload;
      const index = state.notes.findIndex((note) => note?.id === id);
      if (index !== -1) {
        state.notes[index].collaborators = [
          ...state.notes[index].collaborators,
          email,
        ];
      }
    },
    removeNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    updateNote(state, action) {
      const updatedNote = action.payload;
      const index = state?.notes?.findIndex(
        (note) => note?.id === updatedNote?.id
      );
      if (index !== -1) {
        state.notes[index] = updatedNote;
      }
    },
    searchNote(state, action) {
      const searchTerm = action.payload;
      if (!searchTerm) {
        state.notes = [...state.originalNotes];
      } else {
        state.notes = state.originalNotes?.filter((note) =>
          note?.taskText?.toLowerCase().includes(searchTerm?.toLowerCase())
        );
      }
    },
    initializeNotes(state, action) {
      state.originalNotes = action.payload;
      state.notes = action.payload;
    },
    updateProgress(state, action) {
      const { id, progress } = action.payload;
      const index = state.notes.findIndex((note) => note?.id === id);
      if (index !== -1) {
        const updatedProgress = Math.min(100, Math.max(0, progress));
        state.notes[index].progress = updatedProgress;
      }
    },
  },
});

export const {
  addNote,
  addAssign,
  searchNote,
  removeNote,
  updateNote,
  updateProgress,
  initializeNotes,
  addCollaborators,
} = noteSlice.actions;
export default noteSlice.reducer;
