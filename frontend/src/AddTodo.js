import React from 'react'
import {useState } from 'react'
import axios from 'axios'

const AddTodo = ({fetchTodos}) => {

    const [formData,setFormData]=useState({date:'',todo:''})

    
    const addTodo=async()=>{
        try {
          const response=await axios.post("http://localhost:7000/api/todoapp/addtodo",formData)
          if(response.data.success)
          {
              alert("Added task.")
              console.log("added")
              fetchTodos()
          }
          else{
              alert("Could not add task!")
              console.log(response.data)
          }
        } catch (error) {
           console.log(error)
        }
  }


    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(formData)
        setFormData({date:'',todo:''})
        addTodo()
    }

    return <div>
            <form style={{maxWidth:'500px',margin:'10px auto'}} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Select Date To be Complete the task</label>
                    <input required name='date' onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})} type="date" value={formData.date} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Add Task</label>
                    <input required name='todo' onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})} type="text" value={formData.todo} className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    
}

export default AddTodo
