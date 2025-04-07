import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserDetails from './UserDetails';

// Example detail for a single user:
const mockUser = {
  id: 5,
  name: 'Alice Wonderland',
  email: 'alice@example.com',
  phone: '123-456-7890',
  website: 'alice.com',
};

describe('UserDetails page', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockUser),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders loading text initially, then user details', async () => {
    // We'll pass the route as /users/5
    render(
      <MemoryRouter initialEntries={['/users/5']}>
        <Routes>
          <Route path="/users/:userId" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Initially, we expect "Loading..." to show up
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Then the mock data loads
    await waitFor(() => {
      expect(screen.getByText('Alice Wonderland')).toBeInTheDocument();
      expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
      expect(screen.getByText(/alice.com/i)).toBeInTheDocument();
    });
  });
});
