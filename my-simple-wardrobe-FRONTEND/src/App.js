import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from "./pages/ProfilePage"
import HomePage from './pages/HomePage'
import ShoppingPage from "./pages/ShoppingPage"
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import SuccessPage from "./pages/SuccessPage"
import PastPurchaseItem from "./components/profile/PastPurchaseItem"
import Terms from "./pages/Terms"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/products/:category" element={<ShoppingPage/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/success" element={<SuccessPage/>} />
          <Route path="/order/:id" element={<PastPurchaseItem/>} />
          <Route path="/terms" element={<Terms/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;