import './successpage.css'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router"
import { generalRequest } from "../request"
import { emptyCart } from '../redux/cartRedux'

const SuccessPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = location.state?.responseData
    const cart = location.state?.cart
    const currentUser = useSelector((state) => state.user.currentUser)
    
    if (window.history.replaceState) window.history.replaceState(null, null, window.location.href)
    useEffect(() => (data === undefined) && navigate("/"), [data, navigate])
    useEffect(() => data && dispatch(emptyCart()), [data, dispatch])
    useEffect(() => {
        async function createOrder() {
            try {
                await generalRequest.post("orders", {
                    userId: (currentUser?._id || "GUEST"),
                    amount: cart.total,
                    address: data.billing_details.address,
                    name: data.billing_details.name,
                    products: cart.products.map((i) => ({
                        productID: i
                    })),
                })
            } catch(error) {
                console.error(error)
            }
        }
        data && createOrder()
    }, [cart, data, currentUser, navigate])

    const quantity = cart?.quantity
    const total = cart?.total
    const products = cart?.products
    const receipt = data?.receipt_url
    const address = data?.billing_details.address
    const name = data?.billing_details.name


    return (
        <div id='successContainer'>
            <div id="sTitle">
                <h1>Thank You{currentUser ? <span> {currentUser.username}</span> : ""}</h1>
                <p><b>My Simple Wardrobe thanks you for being a valued customer</b></p>
                <h6>Click <a target="_blank" href={receipt} rel="noreferrer">here</a> to view your Receipt</h6>
            </div>
            <div className="sProducts">
                <h1>Items Ordered: ({quantity})</h1>
                {products.map((product) => (
                <div key={product._id+product.color+product.size} className="sProductItem">
                    <img id='sNameI' src={product.img} alt="Product" />
                    <h1 id='sNamePT'>{product.title}</h1>
                    <div id='sNameCWrapper'><span id='sNameC' style={{backgroundColor: `#${product.color}`}}></span></div>
                    <h1 id='sNameP'>{product.size}</h1>
                    <div id="sNamePrWrapper"><p id='sNamePr'><span>{product.quantity}</span> <span>x</span> {product.price}.00<span> USD</span></p></div>
                </div>))}
            </div>
            <div className="sAddress">
                <div className="sAddressBox">
                    <p><span>Shipping Address:</span> <br /> {address.city}, {address.state} <br /> {address.line1} <br /> {address.postal_code} - {address.country}</p>
                </div>
                <div className="sTotal">
                    <h4>Customer: <span>&nbsp; {name}</span></h4>
                    <h4>Order Total: <span>&nbsp; {total}.00 USD</span></h4>
                </div>
            </div>
            <button id='successHomeBtn' onClick={()=>navigate("/")}>Return to Homepage</button>
        </div>
    )
}

export default SuccessPage