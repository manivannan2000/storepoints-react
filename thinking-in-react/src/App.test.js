import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Sample test suite for App
describe('App Component', () => {
  test('renders the FilterableProductTable', () => {
    render(<App />);
    
    // We expect the SearchBar placeholder text from FilterableProductTable to appear
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    expect(searchInput).toBeInTheDocument();

    // Check for some known product in the table
    const apple = screen.getByText(/Apple/i);
    expect(apple).toBeInTheDocument();
  });
});
