import { useState } from 'react';
import AddTask from './AddTask';
import Task from './Task';


const initialTasks = [
    { id: 0, name: "Taj Mahal", visited: false },
    { id: 1, name: "Niagra", visited: false },
    { id: 2, name: "Las Vegas", visited: true }
];


export default function Tasks() {
    const [tasks, setTasks] = useState(initialTasks);

    const listItems = tasks.map(task => (
            <li key={task.id} ><Task task={task} onChange={handleChangeTask} onDelete={handleDeleteTask}></Task> </li>
    ));

    let nextId = 3;

    function handleAddTask(taskName) {
        setTasks([
            ...tasks,
            {
                id: nextId++,
                name: taskName,
                visited: false,
            },
        ]);
    }

    function handleChangeTask(task) {
        setTasks(tasks.map(t => (t.id === task.id) ? task : t));
    }

    function handleDeleteTask(taskId) {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    return (
        <>
            <AddTask onAddTask={handleAddTask}></AddTask>
            <ul>{listItems}</ul>
        </>
    );
}




