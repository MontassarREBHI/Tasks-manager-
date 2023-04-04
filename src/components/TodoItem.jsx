import { useDispatch } from 'react-redux'
import { deleteTodo } from '../features/todos/todoSlice'

function TodoItem({ todo }) {
    const dispatch = useDispatch()
    const onDelete=() => dispatch(deleteTodo(todo._id))
    return (
        <div className="todo">
            <div>{new Date(todo.createdAt).toLocaleString('en-US')}</div>
            <h2>{todo.title}</h2>
            <p>{todo.body}</p>
            <button onClick={onDelete} className='close'>
                X
            </button>
        </div>
    )
}

export default TodoItem