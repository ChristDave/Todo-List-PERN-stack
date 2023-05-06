const express = require("express"); //server properties
const app = express(); //app aura toutes les fonctionnalités du serveur
const cors = require("cors");
const pool = require("./db");  //access the db


// middleware
app.use(cors());
app.use(express.json()) //allows us to access the req.body 


// ROUTES// 

// get all todos
app.get("/todos", async (req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows);
        
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo
app.get("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
        res.json(todo.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
});

// create a todo
app.post("/todos", async (req,res) =>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);

        res.json(newTodo.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
});

// update a todo
app.put("/todos/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]);

        res.json("Todo updated")
    } catch (error) {
        console.error(err.message);
    }
});

//delete a todo
app.delete("/todos/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);

        res.json("Todo deleted")
    } catch (error) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("Server is starting on port 5000");
});