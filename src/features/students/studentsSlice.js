import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {
  fetchStudents,
  addStudentAsync,
  deleteStudentAsync,
  updateStudentAsync
} from "./studentsThunks";

const studentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = studentsAdapter.getInitialState({
  status: "idle",
  error: null,
});

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        studentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addStudentAsync.fulfilled, (state, action) => {
        studentsAdapter.addOne(state, action.payload);
      })

      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        studentsAdapter.removeOne(state, action.payload);
      })

      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        studentsAdapter.upsertOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectTotal: selectStudentCount,
} = studentsAdapter.getSelectors((state) => state.students);

export default studentsSlice.reducer;
