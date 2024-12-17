import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import AddTodo from './AddTodo'

const Todo = () => {

    const [todos,setTodos]=useState([])
    const [loading,setLoading]=useState(false)

    const fetchTodos=async()=>{
        try {
            setLoading(true);
            const response=await axios.get("http://localhost:7000/api/todoapp/gettodo")
            if(response.data.success)
            {
                setTodos(response.data.data)
                console.log(response.data.data)
                setLoading(false)
            }
            else{
                alert("cound not fecth todos")
            }
        } catch (error) {
             console.log(error.message)
        }
    }

    useEffect(()=>{
           fetchTodos()
    },[])

    if(loading)
    {
        return <p>Loading...</p>
    }

    return (
        <>
        <AddTodo/>
        <div style={{margin:'30px auto',maxWidth:'1000px',border:'1px solid black'}}>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Sno</th>
                        <th scope="col">Date</th>
                        <th scope="col">Task</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map((dta,i)=>{
                            return <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{dta.date}</td>
                            <td>{dta.todo}</td>
                            <td><button className='btn btn-info'>Update</button></td>
                            <td><button className='btn btn-danger'>Delete</button></td>
    
                        </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Todo
