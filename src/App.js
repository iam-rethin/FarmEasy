import {Login} from './pages/Login.js'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import SellerReg from './pages/SellerReg';
import Basket from './pages/Basket.js'
import Logout from './pages/Logout.js'
import AdminDash from './pages/AdminDash.js';
import ErrorPage from './pages/ErrorPage.js';
import SellerDash from './pages/SellerDash.js';
import AddProduct from './pages/AddProduct.js';
import Vegetables from './pages/Vegetables.js';
import Fruits from './pages/Fruits.js';
import Plants from './pages/Plants.js';
import ViewOrders from './pages/ViewOrders.js';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/seller-reg' element={<SellerReg/>}/>
          <Route path='/basket' element={<Basket/>}/>
          <Route path='/log-out' element={<Logout/>}/>
          <Route path='/admin' element={<AdminDash/>}/>
          <Route path='/seller-dash' element={<SellerDash/>}/>
          <Route path='/*' element={<ErrorPage/>}/>
          <Route path='/add-prod' element={<AddProduct/>}/>
          <Route path='/veggies' element={<Vegetables/>}/>
          <Route path='/fruits' element={<Fruits/>}/>
          <Route path='/plants' element={<Plants/>}/>
          <Route path='/view-orders' element={<ViewOrders/>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
