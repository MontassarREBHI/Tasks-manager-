const Todo=require('../models/todoModel.js')
const User=require('../models/userModel.js')


const getTodos= (req,res)=>{
    Todo.find({user:req.user.id}).then(result=>res.status(200).json(result)).catch(err=>console.log(err))
}
const addTodo= (req,res)=>{
    Todo.create({
        title:req.body.title,
        body:req.body.body,
        user:req.user.id
    }).then(result=>res.status(201).json(result)).catch(err=>console.log(err))
}
const setTodo=async (req,res)=>{
    const todo=await Todo.findById(req.params.id)

    if(!todo){
        res.status(400).json('todo not found')
    }

    if(!req.user){
        res.status(401).json('user not found')
    }

    if(todo.user.toString() !== req.user.id){
        res.status(401).json('user not authorized')
    }
    
    Todo.findByIdAndUpdate(req.params.id,req.body).
    then(result=>res.status(200).json(result)).
    catch(err=>console.log(err))
}
const deleteTodo=async (req,res)=>{
    const todo=await Todo.findById(req.params.id)

    if(!todo){
        res.status(400).json('todo not found')
    }

  

    if(!req.user){
        res.status(401).json('user not found')
    }

    if(todo.user.toString() !== req.user.id){
        res.status(401).json('user not authorized')
    }

    Todo.findByIdAndRemove(req.params.id).
    then(result=>res.status(200).json(result)).
    catch(err=>console.log(err))
}

module.exports={getTodos,addTodo,setTodo,deleteTodo}