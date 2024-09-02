import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Cart from './Components/Cart';
import PaymentGateway from './Components/PaymentGateway';
import Products from './Components/Products';
import Header from "./Components/Header";
import ScrollToTop from './Components/ScrollToTop'; 
import Footer from './Components/Footer';
import Checkout from './Components/Checkout';
import ProductDetail from './Components/ProductDescription';
import CustomModal from './Components/Modal';
import MyOrder from './Components/MyOrder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Components/Profile';

function App() {
  return (
    <div className="App">
      <header>
        <BrowserRouter>
         <Header/>
         <CustomModal/>
         <ToastContainer />
         <ScrollToTop />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/products/:categoryId" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Checkout />} />
            <Route path="/myOrder" element={<MyOrder />} />
            <Route path="/payment" element={<PaymentGateway />} />
            <Route path="/productDetails/:productId" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
