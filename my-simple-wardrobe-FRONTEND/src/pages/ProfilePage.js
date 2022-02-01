import './profilepage.css'
import { useEffect, useState } from 'react'
import { getOrders } from '../redux/authRedux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import AccountSettings from '../components/profile/AccountSettings'
import PastPurchases from '../components/profile/PastPurchases'
import WishList from '../components/profile/WishList'
import { ArrowBack } from '@material-ui/icons'

function ProfilePage() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const fromOrders = location.state?.fromOrders
    const userID = useSelector((state) => state.user.currentUser._id)
    useEffect(() => getOrders(userID, dispatch), [dispatch, userID])
    const initialAccount = fromOrders ? false : true
    const initialOrders = fromOrders ? true : false

    const [account, setAccount] = useState(initialAccount)
    const [wish, setWish] = useState(false)
    const [orders, setOrders] = useState(initialOrders)

    function handleAccount() {
        setAccount(true)
        setWish(false)
        setOrders(false)
    }
    function handleWish() {
        setAccount(false)
        setWish(true)
        setOrders(false)
    }
    function handleOrders() {
        setAccount(false)
        setWish(false)
        setOrders(true)
    }

    return (
    <div>
        <Navbar/>
            <div className='profileContainer'>
            <ArrowBack id="arrowBackProfile" onClick={() => navigate('/')}/>
                <div className="profileHeader">
                    <h1>Your Profile</h1>
                    <div className="profileHeaderLinks">
                        <p id='sec' className={account ? "secActive" : null} onClick={() => handleAccount()}>Account Settings</p>
                        <p id='sec' className={wish ? "secActive" : null} onClick={() => handleWish()}>Favorites</p>
                        <p id='sec' className={orders ? "secActive" : null} onClick={() => handleOrders()}>Order History</p>
                    </div>
                </div>
                <div className="profileBody">
                    {account && <AccountSettings/>}
                    {wish && <WishList/>}
                    {orders && <PastPurchases/>}
                </div>
            </div>
        <Footer/>
    </div>
    )
}

export default ProfilePage
