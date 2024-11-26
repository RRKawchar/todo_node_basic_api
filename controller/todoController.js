const express = require('express');
const db = require('../config/db');

// Test Method || GET
const testMethod = async (req, res) => {
    console.log("Test method is starting...");
    res.status(200).send({
        success: true,
        statusCode: 200,
        message: "Test Method Execute successfully!"
    });
}


// Get all Todo List || GET
const getAllTodo = async (req, res) => {
    try {

        const data = await db.query(`SELECT * FROM todo`);
        if (!data) {
            return res.status(404).send({
                success: false,
                statusCode: 404,
                message: "Todo Records Not Found"
            });
        }
        res.status(200).send({
            success: true,
            statusCode: 200,
            message: "Record Get Successfully!",
            todoList: data[0]
        });

    } catch (error) {
        console.log(`Error while get all todo method hit : ${error}`);
        res.status(500).send(
            {
                success: false,
                message: "Error while hit get all todo api",
                error

            }
        );
    }
}


const createTodo = async (req, res) => {

    try {

        if (!req.body) {
            res.status(404).send({
                success: false,
                message: "Bad Request"
            });
        }

        const { title, category, description, date, time } = req.body;

        if (!title || !category || !description || !date || !time) {
            return res.status(400).send({
                success: false,
                statusCode: 400,
                message: 'Please provide all fields'
            });
        }


        const data = await db.query(`INSERT INTO todo (title,category,description,date,time) VALUES(?,?,?,?,? )`, [title, category, description, date, time]);
        if (!data) {
            return res.status(400).send({
                success: false,
                statusCode: 400,
                message: 'Error to create todo'
            });
        }

        res.status(201).send({
            success: true,
            statusCode: 201,
            message: 'Todo list added successfully!'
        });

    } catch (error) {
        console.log(`Error while create todo method hit : ${error}`);
        res.status(500).send(
            {
                success: false,
                message: "Error while hit create todo api",
                error

            }
        );
    }
}


const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

        // Check if ID is provided
        if (!todoId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid ID or provided ID',
            });
        }

        const { title, category, description, date, time } = req.body;

        // Validate required fields
        if (!title || !category || !description || !date || !time) {
            return res.status(400).send({
                success: false,
                statusCode: 400,
                message: 'Please provide all fields',
            });
        }

        // Correct SQL statement with proper commas
        const sql = `UPDATE todo SET title=?, category=?, description=?, date=?, time=? WHERE id=?`;
        const data = await db.query(sql, [title, category, description, date, time, todoId]);

        if (!data) {
            return res.status(500).send({
                success: false,
                message: 'Todo update failed or internal server error',
            });
        }

        res.status(200).send({
            success: true,
            statusCode: 200,
            message: 'Todo updated successfully!',
        });
    } catch (error) {
        console.error(`Error while updating todo: ${error.message}`);
        res.status(500).send({
            success: false,
            message: 'Error while hitting update todo API',
            error: error.message,
        });
    }
};


const searchById = async (req, res) => {
    try {
        const todoId = req.params.id;
        if (!todoId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid ID or provided ID',
            });
        }

        const data = await db.query(`SELECT * FROM todo WHERE id=?`,[todoId]);
        if(!data){
            return res.status(404).send({
               success:false,
                statusCode:404,
               message:"Not found!"
            });
        }

        res.status(200).send({
          success:true,
          statusCode:200,
          message:'Task Search success',
          queryData:data[0]
           
        });
      
    } catch (error) {
        console.error(`Error while updating todo: ${error.message}`);
        res.status(500).send({
            success: false,
            message: 'Error while hitting update todo API',
            error: error.message,
        });
    }
};


const deleteTodoById = async(req,res)=>{
    try {
        const todoId = req.params.id;
        if (!todoId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid ID or provided ID',
            });
        }

        const data = await db.query(`DELETE FROM todo WHERE id=?`,[todoId]);
        if(!data){
            return res.status(404).send({
               success:false,
                statusCode:404,
               message:"Not found!"
            });
        }

        res.status(200).send({
          success:true,
          statusCode:200,
          message:'Task Delete successfully!', 
           
        });
      
    } catch (error) {
        console.error(`Error while deleting todo task: ${error.message}`);
        res.status(500).send({
            success: false,
            message: 'Error while hitting delete todo API',
            error: error.message,
        });
    }
}




module.exports = { testMethod, getAllTodo, createTodo,updateTodo,searchById,deleteTodoById };