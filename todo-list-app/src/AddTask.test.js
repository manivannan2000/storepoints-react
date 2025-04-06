import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from './AddTask';

describe('AddTask component', () => {
  test('renders input and button', () => {
    render(<AddTask onAddTask={() => {}} />);
    const inputEl = screen.getByPlaceholderText(/add task/i);
    const buttonEl = screen.getByRole('button', { name: /add/i });

    expect(inputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });

  test('calls onAddTask with input value when button is clicked', () => {
    const mockOnAddTask = jest.fn();
    render(<AddTask onAddTask={mockOnAddTask} />);

    const inputEl = screen.getByPlaceholderText(/add task/i);
    const buttonEl = screen.getByRole('button', { name: /add/i });

    // Type into the input
    fireEvent.change(inputEl, { target: { value: 'My New Task' } });
    // Click the Add button
    fireEvent.click(buttonEl);

    // Expect callback to have been called with the correct argument
    expect(mockOnAddTask).toHaveBeenCalledWith('My New Task');

    // Input should be cleared after adding
    expect(inputEl).toHaveValue('');
  });
});
