import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar component', () => {
  test('renders Home and Users links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    const usersLink = screen.getByRole('link', { name: /users/i });

    expect(homeLink).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
  });
});
