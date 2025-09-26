import React, { useState } from 'react';
import { v4 as uuid } from "uuid";
import Todo from "./Todo";


interface TodoInterface {
    task: string;
    id: string;
}

function TodoList() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState<TodoInterface[]>([]);

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        setTask(evt.target.value);
    }

    function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setTodos(t => [...t, { id: uuid(), task }]);
        setTask("");
    }

    return (
        <>
            <h1>Todos!</h1>
            <ul>{todos.map(t => <Todo key={t.id} task={t.task} />)}</ul>

            <form onSubmit={handleSubmit}>
                <label htmlFor="task">Task: </label>
                <input id='task' value={task} onChange={handleChange} />
                <button>Add</button>
            </form>
        </>
    )
}

export default TodoList;