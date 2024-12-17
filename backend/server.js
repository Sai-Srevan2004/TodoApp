const express = require('express')
const app = express()
require('dotenv').config();
const mongoose = require('mongoose')
const cors = require('cors')
const Todo = require('./models/Todo')

PORT = process.env.PORT || 9000
MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI).then(() => {
    console.log("Db connected!")
})
    .catch((err) => {
        console.log(err.message)
    })

app.use(cors({
    origin: "*"
}))
app.use(express.json())

//get todos
app.get('/api/todoapp/gettodo', async (req, res) => {
    try {
        const data = await Todo.find({});
        return res.json({
            success: true,
            data: data,
            message: "Got all todos"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})


app.get('/api/todoapp/gettodo/:id', async (req, res) => {
    try {

        const {id}=req.params;
        const data = await Todo.findById(id);

        if(!data)
        {
            return res.json({
                success:false,
                data:data,
                message:'Got it!'
            })
        }
        return res.json({
            success: true,
            data: data,
            message: "Got all todos"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

//post todos

app.post('/api/todoapp/addtodo', async (req, res) => {
    try {
        const { date, todo } = req.body;

        console.log(req.body)

        const newTodo = await Todo.create({
            todo,
            date
        })

        return res.json({
            success: true,
            data: newTodo,
            message: "Todo created successfully!"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})


//update todos

app.put('/api/todoapp/updatetodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const exist = await Todo.findByIdAndUpdate(id, data, { new: true })

        if (!exist) {
            return res.json({
                success: false,
                message: "No todo id found!"
            })
        }

        return res.json({
            success: true,
            data: exist,
            message: "todo updated successfully!"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})


//delete todo
app.delete('/api/todoapp/deletetodo/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const exist=await Todo.findByIdAndDelete(id,{new:true})

        if (!exist) {
            return res.json({
                success: false,
                message: "No todo id found!"
            })
        }
        return res.json({
            success: true,
            data: exist,
            message:"todo deleted successfully!"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})


app.listen(PORT,() => {
    console.log("server running at PORT", PORT)
})

