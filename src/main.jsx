import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter,Routes,Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import TaskDetail from './page/TaskDetail.jsx'


const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
        <Route index element={<App/>}/>
        <Route path='/:id' element={<TaskDetail/>} />
    </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
  ,
)
