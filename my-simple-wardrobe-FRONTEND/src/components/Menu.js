import "./menu.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Menu() {
    const navigate = useNavigate()
    const [menuActive, setMenuActive] = useState(false)
    function handleNavigate(location) {
        navigate(`/products/${location}`)
        setMenuActive(false)
    }
    return (
    <div>
        <nav className="menu">
            <p className="menu-toggle-button" onClick={() => setMenuActive(!menuActive)}>
                <span className={menuActive ? "menu-bar menuActive" : "menu-bar"}></span>
                <span className={menuActive ? "menu-bar menuActive" : "menu-bar"}></span>
                <span className={menuActive ? "menu-bar menuActive" : "menu-bar"}></span>
            </p>
            <div className={menuActive ? "menu-navbar-links menuActive" : "menu-navbar-links"}>
                <ul>
                    <li><p onClick={()=>handleNavigate("shirts")} className="menu-link">Shirts</p></li>
                    <li><p onClick={()=>handleNavigate("pants")} className="menu-link">Pants</p></li>
                    <li><p onClick={()=>handleNavigate("outerware")} className="menu-link">Outerware</p></li>
                    <li><p onClick={()=>handleNavigate("shoes")} className="menu-link">Shoes</p></li>
                    <li><p onClick={()=>handleNavigate("accessories")} className="menu-link">Accessories</p></li>
                </ul>
            </div>
        </nav>
    </div>
    )
}

export default Menu
