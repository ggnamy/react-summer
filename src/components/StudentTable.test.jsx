import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../tests/server';
import { renderWithProviders } from '../tests/utils';
import StudentTable from './StudentTable';

test('shows loading state initially', () => {
  renderWithProviders(<StudentTable />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('shows student data after fetch', async () => {
  renderWithProviders(<StudentTable />);
  await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});

test('shows error message on fetch failure', async () => {
  server.use(
    http.get('https://68ea00eff1eeb3f856e5bf33.mockapi.io/students', () =>
      HttpResponse.json({}, { status: 403 })
    )
  );
  renderWithProviders(<StudentTable />);
  await waitFor(() => {
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });
});
