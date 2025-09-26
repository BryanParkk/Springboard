interface TodoProps {
    task: string;
}

function Todo({ task }: TodoProps) {
    return (
        <div>
            <p>{task}</p>
        </div>
    )
}

export default Todo;