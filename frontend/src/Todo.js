import React from 'react'

const Todo = ({todos,loading,handleUpdate,handleDeletion}) => {

    

    if(loading)
    {
        return <p>Loading...</p>
    }

    return (
        <>
           {
            todos.length!=0?<div style={{margin:'30px auto',maxWidth:'1000px',border:'1px solid black'}}>
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
                            <td><button className='btn btn-info' onClick={()=>handleUpdate(dta._id)}>Update</button></td>
                            <td><button className='btn btn-danger'onClick={()=>handleDeletion(dta._id)}>Delete</button></td>
    
                        </tr>
                        })
                    }
                </tbody>
            </table>
        </div>:<h1 style={{margin:'100px',textAlign:'center'}}>No Todos Available!</h1>
           }
        </>
    )
}

export default Todo
