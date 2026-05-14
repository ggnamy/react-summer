import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { studentsApi } from '../features/students/studentApi';
import { coursesApi } from '../features/courses/courseApi';
import gradesReducer from '../features/grades/gradesSlice';

export function renderWithProviders(ui, { preloadedState = {} } = {}) {
  const store = configureStore({
    reducer: {
      [studentsApi.reducerPath]: studentsApi.reducer,
      [coursesApi.reducerPath]: coursesApi.reducer,
      grades: gradesReducer,
    },
    middleware: (getDefault) =>
      getDefault().concat(studentsApi.middleware).concat(coursesApi.middleware),
    preloadedState,
  });

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
