import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

// export const loader = async()=>{
//     const Task = await axios.get(`http://localhost:3000/api/v1/tasks/`)
//     return Task
// }

const TaskDetail = () => {
    const [task,setTask] = useState(null)
    const [alert,setAlert] = useState(false)
    const [show,setShow] = useState(false)
    const {id} = useParams()
    useEffect(()=>{
        const getTask = async()=>{

            const Task = await axios.get(`http://localhost:3000/api/v1/tasks/${id}`)
            setTask(prev=>Task.data.task)
            console.log(Task.data.task)
        }
        getTask()
        if(show){
            {setTimeout(()=>{
                const el = document.querySelector('#alert')
                // el.classList.add('hidden')
                setShow(prev=>false)
                console.log(show)
            },2000)}
        }
    },[id,show])
    const submit = async()=>{
        const el = document.querySelector('#name')
        const completed = document.querySelector('#check')

        console.log(el.value,completed.checked)
        await axios.patch(`http://localhost:3000/api/v1/tasks/${id}`,{name:el.value,completed:completed.checked})
    }
  return (    
    <div className='w-[50%] mx-auto min-w-[500px] py-10'>
         <div className='bg-white px-8 py-10 mb-16 rounded-[20px] shadow-lg '>
            {task? <div>
                <div className='flex items-center justify-between gap-20'>

                <h1 className='text-xl my-4'>Task Id</h1>
                <p className='grow py-2 text-gray-600 font-bold'>{task?._id}</p>
            </div>
            <div className='flex items-center justify-between gap-20'>

                <h1 className='text-xl my-4 '>Name</h1>
                <input type="text" id='name' defaultValue={task.name}  onChange={(e)=>{
                    console.log(e.target.value)

                }} className='bg-gray-100 p-2 grow text-gray-800 font-semibold'/>
            </div>
            <div className='flex items-center gap-10 '>

                <h1 className='text-xl my-4 '>Completed</h1>
                <input type="checkbox" id='check'   onChange={(e)=>{
                    console.log(e.target.checked)

                }} className='mr-auto ' defaultChecked={task.completed}/>
            </div>
            <button onClick={(e)=>{
                    try{

                        submit()
                        setAlert(prev=>true)
                        setShow(prev=>true)
                    }catch(err){
                        console.log(err)
                    }
                    }} className='bg-blue-800 tracking-wide text-2xl rounded-md text-white py-2 w-full'>Edit
            </button>
            <div className={`text-center py-4 font-semibold text-green-600  ${show?'block':'hidden'}`} id='alert'>Edit Successful</div>
            
            
            </div>:'loading....'}
            
        </div>
        <a href='/' className='mx-auto inline-block py-4 px-2 bg-purple-950 text-center rounded-xl text-white font-semibold'>Back to Tasks</a>
    </div>
  )
}

export default TaskDetail