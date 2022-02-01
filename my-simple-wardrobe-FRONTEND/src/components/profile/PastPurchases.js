import './pastpurchases.css'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { ChevronRight } from '@material-ui/icons'
import moment from 'moment'

function PastPurchases() {
    const navigate = useNavigate()
    const orders = useSelector((state) => state.orders.orders)

    return (
    <div className='historyContainer'>
        <div className="historyWrapper">
            <div className="historyHeading">
                <div className="historyHeadingTop">
                    <h1>Your Order History</h1>
                </div>
                <p>{orders?.length || 0} {orders?.length === 1 ? "Completed Order" : "Completed Orders"}</p>
            </div>
            <div className="historyBody">
            {orders?.length === 0 ? <p id='historyIsEmpty'>Order History is Empty</p> :
                <table className="historyTable">
                    <thead className="historyTableHeader">
                    <tr>
                        <th scope="col">Order Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Price</th>
                        <th scope="col">Order Number</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <Fragment key={order._id}>
                        <tr className="historyItem" onClick={() => navigate(`/order/${order._id}`)}>
                            <td className="history-order-item">{moment(order.createdAt, 'YYYY-MM-DD[T00:00:00.000Z]').format('YYYY-MM-DD')}</td>
                            <td className="history-order-item">Shipped</td>
                            <td className="history-order-item">${order.amount}.00</td>
                            <td className="history-order-item">#{(order._id).substring(0, 12)}</td>
                            <td className="order-arrow-container"><ChevronRight/></td>
                        </tr>
                        <tr className="trFiller"></tr>
                        </Fragment>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
    </div>
    )
}

export default PastPurchases
