import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound page', () => {
  test('renders 404 message', () => {
    render(<NotFound />);
    const notFoundText = screen.getByText(/404 - page not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
