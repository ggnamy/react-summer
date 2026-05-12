import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://68ea00eff1eeb3f856e5bf33.mockapi.io/courses';

// 1. ดึงข้อมูลวิชาทั้งหมด
export const fetchCourses = createAsyncThunk(
    'courses/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) throw new Error('เรียกข้อมูลวิชาไม่สำเร็จ');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// 2. เพิ่มวิชาใหม่
export const addCourseThunk = createAsyncThunk(
    'courses/addCourse',
    async (newCourse, { rejectWithValue }) => {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCourse),
            });
            if (!response.ok) throw new Error('เพิ่มวิชาไม่สำเร็จ');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// 3. ลบวิชา
export const deleteCourseThunk = createAsyncThunk(
    'courses/deleteCourse',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('ลบวิชาไม่สำเร็จ');
            return id; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);