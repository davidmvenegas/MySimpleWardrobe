import "./sidebar.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import { PermIdentity, Storefront } from "@material-ui/icons"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/userRedux"

function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [users, setUsers] = useState(true)
  const [products, setProducts] = useState(false)

  function handleUsers() {
    setUsers(true)
    setProducts(false)
  }
  function handleProducts() {
    setUsers(false)
    setProducts(true)
  }
  function handleLogout() {
    dispatch(logout())
    navigate("/")
  }

  return (
    <div className="sidebar">
    <div className="siebarTitleWrapper">
      <h1>ADMIN PORTAL</h1>
    </div>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/users" className="link" onClick={handleUsers}>
              <li className={users?"sidebarListItem active":"sidebarListItem"}><PermIdentity className="sidebarIcon"/>Users</li>
            </Link>
            <Link to="/products" className="link" onClick={handleProducts}>
              <li className={products?"sidebarListItem active":"sidebarListItem"}><Storefront className="sidebarIcon"/>Products</li>
            </Link>
          </ul>
        </div>
        <button onClick={handleLogout} className="logoutButton">LOGOUT</button>
      </div>
    </div>
  )
}
export default Sidebar