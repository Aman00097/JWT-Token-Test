import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Category from './pages/Category';
import AddCategory from './components/AddCategory';
import Product from './pages/Product';
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
          <Route exact path='/category' element={<Category />} />
          <Route exact path='/category/add-data' element={<AddCategory />} />
          <Route exact path='/category/add-data/:categoryId' element={<AddCategory />} />
          <Route exact path='/product' element={<Product />} />
          <Route exact path='/product/add-data' element={<AddProduct />} />
          <Route exact path='/product/add-data/:productId' element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
