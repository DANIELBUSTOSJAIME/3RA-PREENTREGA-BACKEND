import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { SignUp } from './components/SignUp.jsx'
import { Login } from './components/Login.jsx'
import { Products } from './components/Products.jsx'
import { NewProducts } from './components/NewProducts.jsx'

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/products' element={<Products />}/>
          <Route path='/new-products' element={<NewProducts />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
