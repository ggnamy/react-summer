import { createSlice } from "@reduxjs/toolkit";

const gradesSlice = createSlice({
  name: "grades",
  initialState: {
    list: [],
  },
  reducers: {
    addGrade: (state, action) => {
      state.list.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    updateGrade: (state, action) => {
      const index = state.list.findIndex(
        (grade) => grade.id === action.payload.id
      );

      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteGrade: (state, action) => {
      state.list = state.list.filter((grade) => grade.id !== action.payload);
    },
  },
});

export const { addGrade, updateGrade, deleteGrade } = gradesSlice.actions;

export default gradesSlice.reducer;