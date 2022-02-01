import "./newuser.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addMember } from "../../redux/authRedux"

function NewUser() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({})

  function handleChange(e) {
    setInputs(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const product = {...inputs}
    addMember(product, dispatch)
    setTimeout(() => {navigate("/users")}, 2000)
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className={`newUserItem ${loading ? 'lighter' : ''}`}>
          <label>Username</label>
          <input name="username" type="text" placeholder="John" onChange={handleChange} required/>
        </div>
        <div className={`newUserItem ${loading ? 'lighter' : ''}`}>
          <label>Email</label>
          <input name="email" type="email" placeholder="john@gmail.com" onChange={handleChange} required/>
        </div>
        <div className={`newUserItem ${loading ? 'lighter' : ''}`}>
          <label>Password</label>
          <input name="password" type="password" placeholder="********" onChange={handleChange} required/>
        </div>
        <div className={`addProductItem ${loading ? 'lighter' : ''}`}>
          <label>Admin?</label>
          <select name="isAdmin" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        {loading && <div id="loadingNewUser"></div>}
        <button type="submit" className={`newUserButton ${loading ? 'lighter' : ''}`}>Create</button>
      </form>
    </div>
  )
}
export default NewUser