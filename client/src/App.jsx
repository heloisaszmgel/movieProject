import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/Register'
import HomePage from './components/HomePage'
import Login from './components/Login'
import MovieSearch from './components/MovieSearch'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element = {<MovieSearch/>}/>
          <Route path='/register' element = {< Register/>}/>
          <Route path='/homepage' element={<HomePage/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
