import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const gradesAdapter = createEntityAdapter();

const gradesSlice = createSlice({
  name: "grades",
  initialState: gradesAdapter.getInitialState(),
  reducers: {
    addGrade: (state, action) => {
      gradesAdapter.addOne(state, { id: Date.now(), ...action.payload });
    },
    updateGrade: (state, action) => {
      gradesAdapter.upsertOne(state, action.payload);
    },
    deleteGrade: (state, action) => {
      gradesAdapter.removeOne(state, action.payload);
    },
  },
});

export const { addGrade, updateGrade, deleteGrade } = gradesSlice.actions;

export const {
  selectAll: selectAllGrades,
  selectById: selectGradeById,
  selectTotal: selectGradeCount,
} = gradesAdapter.getSelectors((state) => state.grades);

export default gradesSlice.reducer;
