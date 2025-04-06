import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Task from './Task';

describe('Task component', () => {
  const defaultTask = {
    id: 1,
    name: 'Visit Taj Mahal',
    visited: false,
  };

  test('renders task name and Edit/Delete buttons', () => {
    render(
      <Task
        task={defaultTask}
        onChange={() => {}}
        onDelete={() => {}}
      />
    );

    // Shows the task name
    expect(screen.getByText(/Visit Taj Mahal/i)).toBeInTheDocument();

    // Check for Edit and Delete buttons
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  test('toggles editing mode when Edit is clicked', () => {
    render(
      <Task
        task={defaultTask}
        onChange={() => {}}
        onDelete={() => {}}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });

    // Click "Edit" => show input and "Save" button
    fireEvent.click(editButton);
    const inputEl = screen.getByDisplayValue(/Visit Taj Mahal/i);
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(inputEl).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    // Click "Save" => editing mode ends
    fireEvent.click(saveButton);
    expect(screen.queryByRole('button', { name: /save/i })).not.toBeInTheDocument();
  });

  test('calls onChange when editing and saving new name', () => {
    const mockOnChange = jest.fn();
    render(
      <Task
        task={defaultTask}
        onChange={mockOnChange}
        onDelete={() => {}}
      />
    );

    // Enter editing mode
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    // Change value in input
    const inputEl = screen.getByDisplayValue(/Visit Taj Mahal/i);
    fireEvent.change(inputEl, { target: { value: 'New Name' } });

    // Click save
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    // Ensure onChange was called with updated name
    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultTask,
      name: 'New Name'
    });
  });

  test('calls onDelete when Delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    render(
      <Task
        task={defaultTask}
        onChange={() => {}}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockOnDelete).toHaveBeenCalledWith(defaultTask.id);
  });
});
