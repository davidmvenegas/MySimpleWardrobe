import "./user.css"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateMember } from "../../redux/authRedux"

function User() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const memberId = location.pathname.split("/").at(-1)
    const member = useSelector((state) => state.member.members.find((member) => member._id === memberId))
    const [inputs, setInputs] = useState({})

    function handleChange(e) {
        setInputs(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const member = {...inputs}
        updateMember( memberId, member, dispatch)
        setTimeout(() => {navigate("/users")}, 2000)
    }

    return (
    <div className="product">
        <div className="productTitleContainer">
            <h1 className="productTitle">UPDATE USER</h1>
        </div>
        <div className="userEntireContainer">
            <form className="userForm" onSubmit={handleSubmit}>
                <div className={`userFormLeft ${loading ? 'lighter' : ''}`}>
                    <label>Username:</label>
                    <input type="text" name="username" placeholder={member.username} onChange={handleChange}/>
                    <label>Email:</label>
                    <input type="email" name="email" placeholder={member.email} onChange={handleChange}/>
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="•••••••••••••••••" onChange={handleChange}/>
                    <label>Admin?</label>
                    <select name="isAdmin" id="idStock" onChange={handleChange}>
                        <option value="false" selected={!member.isAdmin}>No</option>
                        <option value="true" selected={member.isAdmin}>Yes</option>
                    </select>
                    {loading && <div id="loadingUpdateUser"></div>}
                    <button type="submit" className={`userActualButton ${loading ? 'lighter' : ''}`}>Update</button>
                </div>
            </form>
        </div>
    </div>
    )
}
export default User