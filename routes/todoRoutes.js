const express = require('express');
const { testMethod,
    getAllTodo,
    createTodo,
    updateTodo,
    searchById,
    deleteTodoById
} = require('../controller/todoController');

// create instance of router
const router = express.Router();

// Test demo method || GET
router.get('/test', testMethod);

// Get all Todo list || GET
router.get('/getAll', getAllTodo);


//Insert Todo || POST
router.post('/create',createTodo);

// Update Todo || PUT
router.put('/update/:id',updateTodo);

// Todo Search by id || PUT
router.get('/search/:id',searchById);


// Task Delete by id || DELETE
router.delete('/delete/:id',deleteTodoById);

module.exports = router;
