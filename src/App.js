import './App.css';
import { Routes, Route } from 'react-router-dom';
import {Home} from "./Pages/Home";
import { Login } from './Pages/Login';
import { SignUp } from './Pages/SignUp';
import { ProductList } from './Pages/ProductList ';
import { AddProduct } from './Pages/AddProduct';
import { EditProduct } from './Pages/EditProduct';
import { InfoProduct } from './Pages/InfoProduct';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:productId" element={<EditProduct />} />
        <Route path="/products/:productId" element={<InfoProduct />} />
      </Routes>
    </div>
  );
}

export default App;
