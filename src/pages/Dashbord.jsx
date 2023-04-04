import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TodoForm from '../components/TodoForm.jsx'
import TodoItem from '../components/TodoItem.jsx'
import Spinner from '../components/Spinner.jsx'
import { getTodos,reset } from '../features/todos/todoSlice.js'

function Dashbord() {
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const {user}=useSelector((state)=>state.auth)
  const {todos,isError,isLoading,message}=useSelector((state)=>state.todos)
  useEffect(()=>{
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }
    dispatch(getTodos())
    return ()=>{
      dispatch(reset())
    }

  },[user,navigate,isError,message,dispatch])

  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
    <section className='heading'>
    <h1>Welcome {user && user.name}</h1>
    <p>Todos Dashboard</p>
    </section>
    <TodoForm/>
    <section className='content'>
      {todos.length>0?(
        <div className="todos">
          {todos.map(todo=>
            <TodoItem key={todo._id} todo={todo}/>
          )}
        </div>
      ):<h3>You did not add any tasks</h3>}
    </section>
    </>
  )
}

export default Dashbord