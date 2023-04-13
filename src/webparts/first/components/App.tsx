import * as React from 'react'

import { Route, Routes } from 'react-router-dom'

import {AddUser} from "./AddUser"
import Home from './Home'
import AddImage from './AddImage'
import {UpdatedUser} from "./UpdatedUser"
import SingleUser from './SingleUser'

const App: React.FC = () => {
  return (
   <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddUser />} />
      <Route path="/update/:id" element={<UpdatedUser />} />
      <Route path="/image/:id" element={<AddImage/>} />
      <Route path="/single/:id" element={<SingleUser/>} />
      

    </Routes>
   </>
  )
}

export default App
