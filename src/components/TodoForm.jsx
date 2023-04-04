import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTodo } from '../features/todos/todoSlice.js';

function TodoForm() {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    })
    const { title, body } = formData;

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const dispatch = useDispatch();
    const onSubmit = e => {
        e.preventDefault()
        const todoData = {
            title,
            body,
        }
        dispatch(createTodo(todoData))
        setFormData({
            title: '',
            body: '',
        })

    }



    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">title</label>
                    <input type="text" className="form-control" id='title'
                        name='title' value={title} placeholder='enter a title' onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="text">body</label>
                    <input type="text" className="form-control" id='body'
                        name='body' value={body} placeholder='enter a task' onChange={onChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>Add a new task</button>
                </div>
            </form>
        </section>
    )
}

export default TodoForm