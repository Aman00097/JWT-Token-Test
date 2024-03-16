import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import AddCategory from './components/AddCategory';
import AddProduct from './components/AddProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Home />} />
          <Route path='/category' element={<Category />} />
          <Route path='/product' element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
