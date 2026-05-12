import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchCourses, addCourseThunk, deleteCourseThunk } from "./coursesThunks";

const coursesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = coursesAdapter.getInitialState({
  status: "idle",
  error: null,
});

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        coursesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addCourseThunk.fulfilled, (state, action) => {
        coursesAdapter.addOne(state, action.payload);
      })
      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        coursesAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllCourses,
  selectById: selectCourseById,
  selectTotal: selectCourseCount,
} = coursesAdapter.getSelectors((state) => state.courses);

export default coursesSlice.reducer;
