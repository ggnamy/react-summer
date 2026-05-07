import { createSlice } from "@reduxjs/toolkit";
import { fetchCourses, addCourseThunk, deleteCourseThunk } from "./coursesThunks";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Course
      .addCase(addCourseThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Delete Course
      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((course) => course.id !== action.payload);
      });
  },
});

export default coursesSlice.reducer;