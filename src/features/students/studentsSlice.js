import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchStudents, 
  addStudentAsync, 
  deleteStudentAsync,
  updateStudentAsync 
} from "./studentsThunks";


const studentsSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        // สำคัญ: แปลงเป็น String เพื่อให้เทียบกับ ID จาก API ได้แม่นยำ
        state.list = state.list.filter((student) => String(student.id) !== String(action.payload));
      })

      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex((student) => String(student.id) === String(action.payload.id));
        if (index !== -1) {
          state.list[index] = action.payload; 
        }
      });
  },
});

export default studentsSlice.reducer;