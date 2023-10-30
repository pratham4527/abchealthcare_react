// import './App.css';
import Addproducts from './components/Addproducts';
import Allmedicines from './components/Allmedicines';
import Allorders from './components/Allorders';
import Allusers from './components/Allusers';
import Cart from './components/Cart';
import Login from './components/Login';
import Medicines from './components/Medicines';
import Order from './components/Order';
// import Navbar from './components/Navbar';
import Register from './components/Register';
// import store from './store';
// import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>

      <BrowserRouter>
            <Routes>
          
                <Route index element={<Medicines />} />
                
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="cart" element={<Cart/>} />
                <Route path="order" element={<Order/>} />
                <Route path="admin/addproducts" element={<Addproducts/>} />
                <Route path="admin/orders" element={<Allorders/>} />
                <Route path="admin/users" element={<Allusers/>} />
                <Route path="admin/medicines" element={<Allmedicines/>} />

           
            </Routes>
          </BrowserRouter>



    </>
  );
}

export default App;
