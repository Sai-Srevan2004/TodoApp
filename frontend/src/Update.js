import React from 'react'
import axios from 'axios'

const Update = ({ upData, setUpData ,id,fetchTodos}) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:7000/api/todoapp/updatetodo/${id}`,upData)

            if (response.data.success) {
                setUpData(response.data.data)
                console.log(upData)
                alert("updated Successfully!")
                setUpData(null)
                fetchTodos()
            }
            else {
                alert("updation failed!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form style={{ maxWidth: '500px', margin: '10px auto' }} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">date</label>
                    <input required name='date' onChange={(e) => setUpData({ ...upData, [e.target.name]: e.target.value })} type="date" value={upData.date || ''} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Task</label>
                    <input required name='todo' onChange={(e) => setUpData({ ...upData, [e.target.name]: e.target.value })} type="text" value={upData.todo} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Ok</button>
                <button className="btn btn-primary" style={{marginLeft:'30px'}} onClick={()=>setUpData(null)}>Cancel</button>

            </form>
</div>
    )
}

export default Update
