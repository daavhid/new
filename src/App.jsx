import React, { useEffect, useState } from 'react'
import {MdCheck, MdDelete, MdEdit, MdIncompleteCircle, MdOutlineCheck, MdOutlineIncompleteCircle} from 'react-icons/md'
import { FaRegCircleCheck } from "react-icons/fa6";
import axios from 'axios'
import { Link } from 'react-router-dom'
import _ from 'lodash'




const App = () => {
    const [tasks,setTasks] = useState([])
    const [fetches,setFetches] = useState(0)
    useEffect(()=>{
        const getTask = async()=>{

            const Tasks = await axios.get('http://localhost:3000/api/v1/tasks')
            setTasks(prev=>Tasks.data.tasks)
        }
        getTask()
        // const el = document.getElementById('el')
        // el.addEventListener('click',(e)=>{
        //     // if(e.target.id==='del'){
        //     //     console.log(e)
        //     // }
        //     console.log(e.target.id)
            
        // })
        // return(()=>{
        //     el.removeEventListener('click',(e)=>{

        //     })
        // })

        
    },[fetches])

    const submit = async()=>{
        const name = document.querySelector('input').value
        console.log(_.kebabCase(name))
        await axios.post('http://localhost:3000/api/v1/tasks',{name})
        setFetches(prev=>prev+1)
    }
    
    // await axios.delete(`http://localhost:3000/api/v1/tasks/${el.id}`)


    console.log(tasks)
  return (
    <div className=''>

        <div className=' pb-16 pt-10 mx-auto w-[40%] min-w-[500px]'>
            <div className='bg-white px-16 py-10 mb-16 rounded-[20px] shadow-lg '>

                <h1 className='text-3xl text-center my-4 '>Task Manager</h1>
                <div className='flex w-full'>

                    <input type="text" className='bg-gray-200 basis-[70%] px-3 outline-none' placeholder='eg wash dish' />
                    <button onClick={async()=>{
                        submit()
                    }} className='bg-blue-800 text-xl text-white py-2 grow '>Submit</button>
                </div>
            </div>
            <div id='el'>

                {tasks?.map((task,key)=>{
                    return (
                        <div key={key} id={task._id} className={`py-2 bg-white  tet-3xl my-4 flex items-center gap-6 px-4 shadow-lg drop-shadow-lg rounded-lg ${task.completed?'line-through':''}`}>
                            {/* <input type="checkbox" name="" id="" className='w-8 h-8 rounded-full'/> */}
                            {task.completed?<FaRegCircleCheck/>:<div className='px-2'></div>}
                        
                            <h1 id='no' className='text- grow'>{task.name}</h1>
                            <div>
                                <a href={`${task._id}`}>
                                    <MdEdit />
                                </a>
                            </div>
                            
                                <MdDelete id={task._id} onClick={async(e)=>{
                                    await axios.delete(`http://localhost:3000/api/v1/tasks/${e.target.parentElement.id}`)
                                    setFetches(prev=>prev-1)
                                    console.log(e.target.parentElement.id)
                                }}/>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default App