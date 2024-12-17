import React from 'react'
import Todo from './Todo'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AddTodo from './AddTodo'
import Update from './Update'

const App = () => {

  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [upData, setUpData] = useState(null);
  const [id,setId]=useState('')

  const handleDeletion=async(id)=>{
    try {
      const response = await axios.delete(`http://localhost:7000/api/todoapp/deletetodo/${id}`)

      if (response.data.success) {
        alert("Deleted Successfully!")
        fetchTodos()
      }
      else {
        alert("Deletion Failed!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:7000/api/todoapp/gettodo/${id}`)

      if (response.data.success) {
        setUpData(response.data.data)
        setId(id)
      }
      else {
        console.log("could not got data by id")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:7000/api/todoapp/gettodo")
      if (response.data.success) {
        setTodos(response.data.data)
        console.log(response.data.data)
        setLoading(false)
      }
      else {
        alert("cound not fecth todos")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Todo App</h1>
      <AddTodo fetchTodos={fetchTodos} />
      <Todo todos={todos} loading={loading} handleUpdate={handleUpdate} handleDeletion={handleDeletion}/>

      {
        upData && <Update upData={upData} setUpData={setUpData} fetchTodos={fetchTodos} id={id}/>
      }
    </div>
  )
}

export default App
