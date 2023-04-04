const express = require ('express');
const router = express.Router();
const {getTodos,addTodo,setTodo,deleteTodo}=require('../controllers/todoController')
const {protect} =require('../middleware/authMiddleware.js')

router.route('/').get(protect,getTodos).post(protect,addTodo)
router.route('/:id').delete(protect,deleteTodo).put(protect,setTodo)


module.exports=router;

