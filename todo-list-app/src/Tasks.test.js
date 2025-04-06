import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tasks from './Tasks';

describe('Tasks component', () => {
  test('renders initial tasks', () => {
    render(<Tasks />);

    // We expect the initial tasks to show up:
    // 0 -> Taj Mahal, 1 -> Niagra, 2 -> Las Vegas
    expect(screen.getByText(/Taj Mahal/i)).toBeInTheDocument();
    expect(screen.getByText(/Niagra/i)).toBeInTheDocument();
    expect(screen.getByText(/Las Vegas/i)).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<Tasks />);

    const inputEl = screen.getByPlaceholderText(/add task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Type new task and click "Add"
    fireEvent.change(inputEl, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    // Check that new task appears
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
  });

  test('deletes a task', () => {
    render(<Tasks />);

    // "Taj Mahal" is ID=0
    // The delete button for it is inside the <Task> as well
    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    // "Taj Mahal" should no longer be in the document
    expect(screen.queryByText(/Taj Mahal/i)).not.toBeInTheDocument();
  });

  test('updates a task name when editing', () => {
    render(<Tasks />);

    // "Taj Mahal" is the first one => index 0
    const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
    fireEvent.click(editButton);

    // Input with "Taj Mahal" value
    const inputEl = screen.getByDisplayValue(/Taj Mahal/i);

    // Change it
    fireEvent.change(inputEl, { target: { value: 'Agra Fort' } });

    // Click save
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // The new name "Agra Fort" should appear
    expect(screen.queryByText(/Taj Mahal/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Agra Fort/i)).toBeInTheDocument();
  });
});
