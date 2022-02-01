import "./login.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginRequest } from "../../redux/authRedux"

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isFetching, currentUser } = useSelector(state => state.user)

    function handleSubmit(e) {
        e.preventDefault()
        loginRequest(dispatch, {email, password})
    }

    useEffect(() => currentUser && navigate("/users"), [currentUser, navigate])

    return (
    <div id="loginContainer">
        <h1 id="loginTitle">My Simple Wardrobe</h1>
        <h1 id="loginSubtitle">ADMIN PORTAL</h1>
        <form id="loginForm" onSubmit={handleSubmit}>
            <input className="loginInput" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input className="loginInput" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button id="loginButton" type="submit" disabled={isFetching || currentUser}>Login</button>
        </form>
    </div>
    )
}

export default Login;
