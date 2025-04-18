import { useState } from 'react';

export default function Task({ task, onChange, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);

    let taskContent;

    if (isEditing) {
        taskContent = (
            <>
                <input value={task.name} onChange={e => { onChange({ ...task, name: e.target.value }) }} ></input>
                <button onClick={() => setIsEditing(false)}>Save</button>
            </>
        );
    } else {
        taskContent = (
            <>
                {task.name}
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </>

        );
    }

    return (
        <label>
            <input type="checkbox" checked={task.visited} onChange = {e => { onChange({...task, visited: e.target.checked})}}/>
            {taskContent}
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </label>
    );

}

