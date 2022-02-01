import { Fragment } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import Login from "./pages/login/Login"
import Sidebar from "./pages/sidebar/Sidebar"
import UserList from "./pages/userlist/UserList"
import User from "./pages/user/User"
import NewUser from "./pages/newuser/NewUser"
import ProductList from "./pages/productlist/ProductList"
import Product from "./pages/product/Product"
import NewProduct from "./pages/newproduct/NewProduct"

function App() {
  const location = useLocation()
  const admin = useSelector((state) => state.user?.currentUser?.isAdmin)
  return (
    <Fragment>
      <div className="container">
        {admin && <>{(location.pathname === '/') ? null : <Sidebar/>}</>}
        <Routes>
          <Route path="/" element={<Login/>} />
          {admin && <>
          <Route path="/users" element={<UserList/>} />
          <Route path="/user/:userId" element={<User/>} />
          <Route path="/newUser" element={<NewUser/>} />
          <Route path="/products" element={<ProductList/>} />
          <Route path="/product/:productId" element={<Product/>} />
          <Route path="/newproduct" element={<NewProduct/>} />
          </>}
        </Routes>
      </div>
    </Fragment>
  )
}

export default App