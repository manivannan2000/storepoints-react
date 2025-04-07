import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Users from './Users';

// Example data returned from the fetch
const mockUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

describe('Users page', () => {
  beforeEach(() => {
    // Mock the fetch function
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockUsers),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders "Users List" heading', async () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    // The heading "Users List" should appear
    expect(screen.getByText(/Users List/i)).toBeInTheDocument();
    
    // Wait for the items to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});
