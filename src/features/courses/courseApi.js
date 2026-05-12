import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE = 'https://68ea00eff1eeb3f856e5bf33.mockapi.io/';

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE }),
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => 'courses',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Course', id })), { type: 'Course', id: 'LIST' }]
          : [{ type: 'Course', id: 'LIST' }],
    }),

    getCourseById: builder.query({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),

    addCourse: builder.mutation({
      query: (course) => ({ url: 'courses', method: 'POST', body: course }),
      invalidatesTags: [{ type: 'Course', id: 'LIST' }],
    }),

    updateCourse: builder.mutation({
      query: (course) => ({ url: `courses/${course.id}`, method: 'PUT', body: course }),
      invalidatesTags: (result, error, course) => [
        { type: 'Course', id: course.id },
        { type: 'Course', id: 'LIST' },
      ],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({ url: `courses/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [
        { type: 'Course', id },
        { type: 'Course', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
