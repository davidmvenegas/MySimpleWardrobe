import "./pastpurchaseitem.css"
import { Fragment } from "react"
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom"
import { Check, ArrowBack } from '@material-ui/icons'
import moment from 'moment'

function PastPurchaseItem() {
  const location = useLocation()
  const navigate = useNavigate()
  const orderID = location.pathname.split("/").at(-1)
  const orders = useSelector((state) => state.orders.orders)
  const item = orders.find(i => i._id === orderID)
  const products = item.products
  const totalPrice = products.map(i => i.productID.price).reduce((holder, current) => holder + current)

  return (
    <div className="piContainer">
      <div className='piWrapper'>
        <div className="piHeader">
        <ArrowBack id="arrowBackOrder" onClick={() => navigate("/profile", {state: { fromOrders: true }})}/>
          <div className="piHeaderTop">
            <h1>Order <span>#{(item._id).substring(0, 12)}</span></h1>
            <p>Date Placed: <span>{moment(item.createdAt, 'YYYY-MM-DD[T00:00:00.000Z]').format("MMMM Do YYYY")}</span></p>
          </div>
          <div className="piHeaderBottom">
            <p><span>Shipping Address:</span><br />{item.address.city}, {item.address.state} <br />{item.address.line1} <br />{item.address.postal_code} - {item.address.country}</p>
            <h6>Customer:&nbsp; <span>{item.name}</span></h6>
          </div>
        </div>
        <div className="piBody">
          <h3> Items Shipped</h3>
          <div className="piBodyItems">
          {products.map((p) => (
            <Fragment key={p.productID._id}>
              <div className="piBodyItem">
                <img src={p.productID.img} alt="Product" />
                <h1>{p.productID.title}</h1>
                <h5>{p.productID.size}</h5>
                <span style={{backgroundColor: `#${p.productID.color}`}}></span>
                <p>{p.productID.quantity} <span>x</span> {p.productID.price}$</p>
                <Check style={{color: "green", fontSize: "2rem"}}/>
              </div>
              <div className="piSlineBR"></div>
            </Fragment>
            ))}
          </div>
        </div>
        <div className="piFooter">
          <h5>Order Summary</h5>
          <div className="piSummary">
            <div className="piSline1">
              <p>Merchandise:</p>
              <p>${totalPrice}.00</p>
            </div>
            <div className="piSline2">
              <p>Shipping:</p>
              <p>{totalPrice > 50 ? 'Free!' : 6.99}</p>
            </div>
            <div className="piSline3">
              <div className="piSlide3Box">
                <h4>Order Total:</h4>
                <p>Your credit card won't be charged until the entire order ships.</p>
              </div>
              <p>{totalPrice > 50 ? `$${totalPrice}.00` : `$${(totalPrice + 6).toFixed(0)}.99`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PastPurchaseItem;
