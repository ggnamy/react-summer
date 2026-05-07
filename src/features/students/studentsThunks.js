import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://68ea00eff1eeb3f856e5bf33.mockapi.io/students';

export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error('ดึงข้อมูลไม่สำเร็จ');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addStudentAsync = createAsyncThunk(
  'students/addOne',
  async (studentData, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ฟังก์ชันสำหรับ Update (PUT)
export const updateStudentAsync = createAsyncThunk(
  'students/updateOne',
  async (studentData, { rejectWithValue }) => {
    try {
      const { id, ...data } = studentData;
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('อัปเดตไม่สำเร็จ');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteStudentAsync = createAsyncThunk(
  'students/deleteOne',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('ลบไม่สำเร็จ');
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);