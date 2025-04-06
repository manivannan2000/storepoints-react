import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders the Tasks component', () => {
    render(<App />);
    // Checks for known tasks from the Tasks component
    expect(screen.getByText(/Taj Mahal/i)).toBeInTheDocument();
    expect(screen.getByText(/Niagra/i)).toBeInTheDocument();
    expect(screen.getByText(/Las Vegas/i)).toBeInTheDocument();
  });
});
