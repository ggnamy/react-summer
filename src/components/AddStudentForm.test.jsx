import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../tests/utils';
import AddStudentForm from './AddStudentForm';

test('clears form fields after successful submission', async () => {
  const user = userEvent.setup();
  renderWithProviders(<AddStudentForm />);

  await user.type(screen.getByPlaceholderText('Full Name'), 'Charlie');
  await user.type(screen.getByPlaceholderText('Student ID'), 'S003');
  await user.type(screen.getByPlaceholderText('Major'), 'Physics');
  await user.type(screen.getByPlaceholderText('GPA (0.0–4.0)'), '3.5');
  await user.click(screen.getByRole('button', { name: /add student/i }));

  await waitFor(() => {
    expect(screen.getByPlaceholderText('Full Name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Student ID')).toHaveValue('');
  });
});
