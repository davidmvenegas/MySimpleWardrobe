import './wishlist.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct } from "../../redux/cartRedux"
import { editWishlist } from "../../redux/authRedux"
import { Favorite } from '@material-ui/icons'
import { generalRequest } from '../../request'

function Wishlist() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const currentUser = useSelector((state) => state.user.currentUser)
    const currentWishlist = useSelector((state) => state.wishlist.wishlist)
    const wishlistID = useSelector((state) => state.wishlist.wishlistId)
    
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await generalRequest.get(`products`)
                setProducts(response.data.filter(item => currentWishlist.includes(item._id)))
            } catch (error) {
                console.error(error)
            }
        }
        getProducts()
    }, [currentWishlist])

    function handleRemoveFromWishlist(itemID) {
        const itemIndex = currentWishlist.indexOf(itemID)
        const updatedWishlist = [...currentWishlist.slice(0, itemIndex), ...currentWishlist.slice(itemIndex + 1)]    
        const userInput = {wishlist: updatedWishlist}
        editWishlist(wishlistID, userInput, dispatch)
    }

    function handleAddToCart(itemID) {
        const product = products.find(product => product._id === itemID)
        const quantity = 1
        const color = product.color.at(0).toString()
        const size = product.size.at(0).toString()
        dispatch(addProduct({...product, quantity, color, size}))
        handleRemoveFromWishlist(itemID)
    }

    return (
    <div className='wishlistContainer'>
        <div className="wishlistWrapper">
            <div className="wishlistHeading">
                <div className="wishlistHeadingTop">
                    <Favorite id="wishlistIconHeart"/>
                    <h1><span style={{textTransform: "capitalize"}}>{currentUser.username}</span>'s Favorites</h1>
                </div>
                <p>{currentWishlist?.length || 0} {currentWishlist?.length === 1 ? "Item" : "Items"}</p>
            </div>
            <div className="wishlistBody">
                {currentWishlist?.length === 0 ? <p id='favsAreEmpty'>Favorites are Empty</p> :
                products.map((favorite) => (
                <div key={favorite._id} className="wishlistItem">
                    <div className="wishlistImageWrapper">
                        <img src={favorite.img} alt="Favorite Product" onClick={() => navigate(`/product/${favorite._id}`)}/>
                        <div className="wishlistDescriptionWrapper">
                            <h1 id='WDIT'>{favorite.title}</h1>
                        </div>
                    </div>
                    <div className="wishlistItemButtons">
                        <p onClick={() => handleAddToCart(favorite._id)}>Add to Bag</p>
                        <p onClick={() => handleRemoveFromWishlist(favorite._id)}>Remove</p>
                    </div>
                </div>))}
            </div>
        </div>
    </div>
    )
}

export default Wishlist