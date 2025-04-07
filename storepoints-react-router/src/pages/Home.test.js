import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home page', () => {
  test('renders welcome message', () => {
    render(<Home />);
    const welcomeText = screen.getByText(/welcome to the user management app!/i);
    expect(welcomeText).toBeInTheDocument();
  });
});
