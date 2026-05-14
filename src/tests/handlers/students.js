import { http, HttpResponse } from 'msw';

const BASE = 'https://68ea00eff1eeb3f856e5bf33.mockapi.io';

export const studentHandlers = [
  http.get(`${BASE}/students`, () =>
    HttpResponse.json([
      { id: '1', name: 'Alice', studentId: 'S001', major: 'CS', gpa: 3.8 },
      { id: '2', name: 'Bob', studentId: 'S002', major: 'Math', gpa: 3.2 },
    ])
  ),
  http.post(`${BASE}/students`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: '3', ...body }, { status: 201 });
  }),
];
