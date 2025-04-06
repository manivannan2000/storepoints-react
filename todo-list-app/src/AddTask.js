import { useState} from 'react';

export default function AddTask({ onAddTask }) {
    const [task, setTask] = useState('');

    return (
        <>
            <input placeholder='Add Task'
                value={task}
                onChange={e => setTask(e.target.value)}
            ></input>
            <button onClick={() => {
                setTask('');
                onAddTask(task);
            }}> Add </button>
        </>
    );

}