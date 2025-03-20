import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterableProductTable from './FilterableProductTable';

// Sample products for testing
const testProducts = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'DragonFruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'PassionFruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
];

describe('FilterableProductTable Component', () => {
  test('renders a search bar', () => {
    render(<FilterableProductTable products={testProducts} />);
    // Checks if the search input is rendered
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders product categories and products', () => {
    render(<FilterableProductTable products={testProducts} />);
    
    // Categories
    const fruitsHeader = screen.getByText(/Fruits/i);
    const vegetablesHeader = screen.getByText(/Vegetables/i);
    expect(fruitsHeader).toBeInTheDocument();
    expect(vegetablesHeader).toBeInTheDocument();

    // Products
    const apple = screen.getByText(/Apple/i);
    const dragonFruit = screen.getByText(/DragonFruit/i);
    const passionFruit = screen.getByText(/PassionFruit/i);
    const spinach = screen.getByText(/Spinach/i);

    expect(apple).toBeInTheDocument();
    expect(dragonFruit).toBeInTheDocument();
    expect(passionFruit).toBeInTheDocument();
    expect(spinach).toBeInTheDocument();
  });

  test('displays out-of-stock items in red', () => {
    render(<FilterableProductTable products={testProducts} />);
    // "PassionFruit" is stocked = false
    const passionFruitElement = screen.getByText(/PassionFruit/i);
    
    // Check if it has inline style with color red
    expect(passionFruitElement).toHaveStyle({ color: 'red' });
  });
});
