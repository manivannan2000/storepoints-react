import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  test('renders the Home page on default route "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to the User Management App!/i)).toBeInTheDocument();
  });

  test('renders the Users page on "/users" route', async () => {
    // Mock fetch to avoid real network request
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([]), // empty list
    });

    render(
      <MemoryRouter initialEntries={['/users']}>
        <App />
      </MemoryRouter>
    );

    // The heading "Users List" should appear
    expect(await screen.findByText(/Users List/i)).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('renders 404 page on an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/some/nonexistent/path']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 - page not found/i)).toBeInTheDocument();
  });
});
