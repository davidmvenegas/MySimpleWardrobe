import './accountsettings.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Close } from "@material-ui/icons"
import { openModal, closeModal } from '../../redux/modalRedux'
import { editUser } from '../../redux/authRedux'

function AccountSettings() {
    const dispatch = useDispatch()
    const handleModal = (type) => dispatch(openModal(type))
    const user = useSelector(state => state.user.currentUser)

    return (
    <div className='accountContainer'>
        <div className="accountItem">
            <h1 className='aIU'>Customer Username:</h1>
            <h1 className='aIM'>{user?.username}</h1>
            <button className='aIB' onClick={() => handleModal("Username")}>Edit</button>
        </div>
        <div className="accountItem">
            <h1 className='aIU'>Customer Email:</h1>
            <h1 className='aIM'>{user?.email}</h1>
            <button className='aIB' onClick={() => handleModal("Email")}>Edit</button>
        </div>
        <div className="accountItem">
            <h1 className='aIU'>Password:</h1>
            <h1 className='aIM'>************</h1>
            <button className='aIB' onClick={() => handleModal("Password")}>Edit</button>
        </div>
        <Modal/>
    </div>
    )
}

function Modal() {
    const dispatch = useDispatch()
    const modal = useSelector(state => state.modal)
    const user = useSelector(state => state.user.currentUser)
    const [input, setInput] = useState({})
    const [loading, setLoading] = useState(false)

    function handleUpdate(e) {
        e.preventDefault()
        const userID = user?._id
        const userInput = {...input}
        setLoading(true)
        editUser(userID, userInput, dispatch)
        setTimeout(() => {updateHelper()}, 1500)
    }
    function updateHelper() {
        document.getElementById("modalFormID").reset()
        setLoading(false)
        dispatch(closeModal())
    }
    function handleClose() {
        setInput({})
        dispatch(closeModal())
    }
    function handleInput(e) {
        setInput({[e.target.name]: e.target.value})
    }
    function type() {
        if (modal.type === "Username") {
            return "text"
        } else if (modal.type === "Email") {
            return "email"
        } else if (modal.type === "Password") {
            return "password"
        }
    }
    function name() {
        if (modal.type === "Username") {
            return "username"
        } else if (modal.type === "Email") {
            return "email"
        } else if (modal.type === "Password") {
            return "password"
        }
    }
    function placeholder() {
        if (modal.type === "Username") {
            return user?.username
        } else if (modal.type === "Email") {
            return user.email
        } else if (modal.type === "Password") {
            return "•••••••••••"
        }
    }

    return (
    <div style={modal.open ? null : {display: "none"}} className="modalBackground">
        <form id='modalFormID' className="modalContainer" onSubmit={handleUpdate}>
                <div className={`titleCloseBtnM ${loading ? 'lighterM' : ''}`}>
                    <button onClick={handleClose}><Close id="closeModalX"/></button>
                </div>
                <div className={`title ${loading ? 'lighterM' : ''}`}>
                    <h1>Update {modal.type}</h1>
                </div>
                <div className={`body ${loading ? 'lighterM' : ''}`}>
                    <input name={name()} type={type()} placeholder={placeholder()} onChange={handleInput} required/>
                </div>
                <div className={`footer ${loading ? 'lighterM' : ''}`}>
                    <button onClick={handleClose} id="cancelBtn">Cancel</button>
                    <button type='submit'>Update</button>
                </div>
            {loading && <div id="loadingUpdateUser"></div>}
        </form>
    </div>
    )
}

export default AccountSettings
