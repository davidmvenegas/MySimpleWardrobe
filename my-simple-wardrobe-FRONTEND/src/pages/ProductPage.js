import "./productpage.css"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addProduct } from "../redux/cartRedux"
import { editWishlist } from "../redux/authRedux"
import { editReviews } from "../redux/authRedux"
import { Add, Remove, ArrowBack, Favorite, FavoriteBorder, Check } from "@material-ui/icons"
import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Menu from "../components/Menu"
import Swal from 'sweetalert2'
import moment from 'moment'
import { Rating } from 'react-simple-star-rating'
import { generalRequest } from "../request"
import { large, medium, mobile, small, smaller, tiny, veryLarge } from "../responsive"

const Container = styled.div``
const Wrapper = styled.div`
    position: relative;
    padding: 0 50px;
    display: flex;
    ${small({ padding: "10px", flexDirection:"column" })}
`
const ImgContainer = styled.div`
    flex: 5;
`
const Image = styled.img`
    width: 100%;
    height: 85vh;
    margin-top: 5vh;
    margin-bottom: 5vh;
    object-fit: cover;
    ${veryLarge({ height: "65vh" })}
    ${large({ height: "57.5vh" })}
    ${medium({ height: "52.5vh" })}
    ${small({ height: "45vh", width: "50%", marginLeft: '5vw', marginTop: "0vh", marginBottom: "0vh" })}
    ${smaller({ height: "35vh"})}
    ${mobile({ height: "22.5vh", marginTop: "3.5vh", marginLeft: '2.5vw', width: "45%" })}
    ${tiny({ height: "20vh", marginTop: "5vh" })}
`
const InfoContainer = styled.div`
    flex: 4;
    padding: 75px 50px;
    ${medium({ padding: "75px 20px" })}
    ${small({ padding: "25px 100px 50px" })}
    ${smaller({ padding: "10px 50px 50px" })}
    ${mobile({ padding: "10px 10px 50px" })}
    ${tiny({ padding: "30px 0px 50px" })}
    `
const Title = styled.h1`
    font-weight: 200;
    font-size: 3rem;
    ${medium({ fontSize: "2.5rem" })}
    ${small({ fontSize: "2.25rem" })}
    ${smaller({ fontSize: "1.75rem", fontWeight: "500" })}
    ${mobile({ fontSize: "1.35rem", fontWeight: "900" })}
    `
const Desc = styled.p`
    margin: 20px 0px 22.5px;
    font-size: 1.25rem;
    font-weight: 200;
    ${small({ position: "absolute", top: "20vh", right: "6.5%", width: "37.5%", fontSize: "1.125rem" })}
    ${smaller({ top: "15vh", right: "5%", width: "40%" })}
    ${mobile({ top: "10.5vh", right: "2.5%", width: "48.5%", margin: "10px 0 22.5px" })}
`
const Price = styled.span`
    font-weight: 100;
    font-size: 45px;
    margin-right: 2rem;
    ${medium({ fontSize: "38.5px" })}
    ${small({ fontSize: "35px" })}
    ${mobile({ visibility: "visible", fontSize: "28.5px", fontWeight: "300" })}
`
const FilterContainer = styled.div`
    width: fit-content;
    margin: 25px 0 32.5px;
    display: flex;
    justify-content: space-between;
    ${small({ width: "100%", justifyContent: "space-around", marginTop: "-1rem" })}
    ${smaller({ marginTop: ".5rem" })}
    `
const Filter = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1.5rem;
    `
const FilterTitle = styled.span`
    font-size: 22.5px;
    font-weight: 200;
    margin-right: .25rem;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #${(i) => i.color};
    margin: 0px 5px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${large({ width: "65%" })}
    ${medium({ width: "80%" })}
    ${small({ width: "90%" })}
    `
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    ${small({ marginLeft: "10%" })}
    `
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    width: 8rem;
    cursor: pointer;
    font-weight: 500;
    &:hover{
        background-color: #f8f4f4;
    }
    ${small({ width: "10rem" })}
    `
const AbsoluteBack = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    height: 3rem;
    width: 5rem;
    background-color: transparent;
    border: none;
    outline: none;
    ${small({ top: ".65rem", left: ".65rem" })}
`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    ${small({ position: "absolute", top: "15vh", width: "37.5%", right: "6.5%" })}
    ${smaller({ top: "10vh", width: "40%", right: "5%" })}
    ${mobile({ top: "7.5vh", width: "48.5%", right: "2.5%" })}
`
const PriceWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    ${small({ position: "absolute", top: "30vh", width: "37.5%", right: "6.5%", flexDirection: "column", alignItems: "flex-start", gap: ".75rem" })}
    ${smaller({ top: "27.5vh", width: "40%", right: "5%", flexDirection: "column", alignItems: "flex-start", gap: ".75rem" })}
    ${mobile({ top: "23.5vh", gap: "0", visibility: "hidden", width: "48.5%", right: "2.5%" })}
`

function ProductPage() {
    useEffect(() => window.scrollTo(0, 0), [])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const productID = location.pathname.split("/").at(-1)
    const [product, setProduct] = useState([])
    const [thisCategory, setThisCategory] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState(null)
    const [size, setSize] = useState(null)
    const [inCart, setInCart] = useState(false)
    const [openReview, setOpenReview] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reviewTitle, setReviewTitle] = useState("")
    const [reviewDesc, setReviewDesc] = useState("")
    const [reviewRating, setReviewRating] = useState(0)
    const isAdmin = useSelector((state) => state.user.currentUser?.isAdmin)
    const currentUser = useSelector((state) => state.user.currentUser)
    const currentWishlist = useSelector((state) => state.wishlist.wishlist)
    const wishlistID = useSelector((state) => state.wishlist.wishlistId)
    const pastOrders = useSelector((state) => state.orders.orders)
    const currentReviews = useSelector((state) => state.reviews.reviews.find(review => review.productId === product?._id))
    const reviews = currentReviews?.reviews
    const liked = currentWishlist?.includes(product?._id)

    const handleRating = (rate) => setReviewRating(rate)
    const productColors = product.color?.slice(0, -1)
    const totalRating = reviews?.length > 0 ? reviews?.map(review => review.rating).reduce((prev, cur) => prev + cur)/reviews?.length : 0

    const pastProductIDs = pastOrders?.map(i => i.products).flat().map(i => i.productID?._id)
    const verifiedProduct = pastProductIDs.includes(product?._id)

    function handleSubmitReview(e) {
        e.preventDefault()
        const productId = product._id
        const username = currentUser?.username
        const userID = currentUser?._id
        const newReview = {
            id: moment().format(),
            date: moment().format("MMM Do YYYY"),
            username: username,
            userID: userID,
            title: reviewTitle,
            desc: reviewDesc,
            rating: reviewRating,
            verified: verifiedProduct
        }
        const reviewData = {
            reviews: [...reviews, newReview]
        }
        setLoading(true)
        editReviews(productId, reviewData, dispatch)
        setTimeout(() => {reviewHelper()}, 1000)
    }
    function reviewHelper() {
        document.getElementById("modalReviewFormID").reset()
        setReviewTitle("")
        setReviewDesc("")
        setReviewRating(0)
        setLoading(false)
        setOpenReview(false)
    }
    function handleCloseReview(e) {
        e.preventDefault()
        document.getElementById("modalReviewFormID").reset()
        setReviewTitle("")
        setReviewDesc("")
        setReviewRating(0)
        setOpenReview(false)
    }
    function handleDeleteReview(reviewID) {
        Swal.fire({
            text: "Are you sure you want to delete this review?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it'
        }).then((result) => {
            if (result.isConfirmed) {
                const productId = product._id
                const updatedReviews = reviews.filter((e) => e !== reviewID)
                const newReviews = {reviews: updatedReviews}
                editReviews(productId, newReviews, dispatch)
                Swal.fire(
                'Your review has been deleted.',
                )
            }
        })
    }

    useEffect(() => {
        async function getProduct() {
            try {
                const response = await generalRequest.get(`products/${productID}`)
                const selectedColor = await response.data.color.at(0).toString()
                const selectedSize = await response.data.size.at(0).toString()
                setColor(selectedColor)
                setSize(selectedSize)
                setProduct(response.data)
                setThisCategory(response.data.categories[0])
            } catch (error) {
                console.error(error)
            }
        }
        getProduct()
    }, [currentReviews, productID])

    const handleQuantity = (input) => {
        input === "remove" ? quantity > 1 && setQuantity(quantity - 1) : setQuantity(quantity + 1)
        setInCart(false)
    }
    function handleColor(colorItem) {
        setColor(colorItem)
        setQuantity(1)
        setInCart(false)
    }
    function handleSize(e) {
        setSize(e.target.value)
        setQuantity(1)
        setInCart(false)
    }
    function handleAddToCart() {
        dispatch(addProduct({...product, quantity, color, size}))
        setInCart(true)
    }
    function handleAddToWishlist() {
        const updatedWishlist = [...currentWishlist, product._id]
        const userInput = {wishlist: updatedWishlist}
        editWishlist(wishlistID, userInput, dispatch)
    }
    function handleRemoveFromWishlist() {
        const itemIndex = currentWishlist.indexOf(product._id)
        const updatedWishlist = [...currentWishlist.slice(0, itemIndex), ...currentWishlist.slice(itemIndex + 1)]        
        const userInput = {wishlist: updatedWishlist}
        editWishlist(wishlistID, userInput, dispatch)
    }

    return (
        <Container>
        <Navbar />
        <Menu/>
        <Wrapper>
            <AbsoluteBack><ArrowBack id="arrowBackProductActual" style={{cursor: "pointer", fontSize: "2.5rem"}} onClick={() => navigate(`/products/${thisCategory}`)}/></AbsoluteBack>
            <ImgContainer>
            <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
                <TitleContainer>
                    {currentUser && (liked ? <Favorite onClick={handleRemoveFromWishlist} id="favoriteProductButtonSolid"/> : <FavoriteBorder onClick={handleAddToWishlist} id="favoriteProductButtonOutline"/>)}
                    <Title>{product.title}</Title>
                </TitleContainer>
                <Desc>{product.desc}</Desc>
                <PriceWrapper>
                    <Price>$ {product.price}</Price>
                    <Rating id="ratingByByStars" size={40} ratingValue={totalRating} readonly={true}/>
                </PriceWrapper>
                <FilterContainer>
                    <Filter>
                    <FilterTitle>Color</FilterTitle>
                        {productColors?.map((colorItem) => (
                            <FilterColor key={colorItem} color={colorItem} onClick={() => handleColor(colorItem)} style={color === colorItem ? {border: "3px solid #888"} : null} />
                        ))}
                    </Filter>
                    <Filter>
                    <FilterTitle>Size</FilterTitle>
                    <FilterSize onChange={(e) => handleSize(e)}>
                        {product.size?.map((sizeItem) => (
                            <FilterSizeOption key={sizeItem}>{sizeItem}</FilterSizeOption>
                        ))}
                    </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                    <Remove style={quantity <= 1 ? {cursor: "not-allowed"} : {cursor: "pointer"}} onClick={()=>handleQuantity("remove")} />
                    <Amount>{quantity}</Amount>
                    <Add style={{cursor: "pointer"}} onClick={()=>handleQuantity("add")}/>
                    </AmountContainer>
                    <Button onClick={handleAddToCart}>{inCart ? "ADDED!" : "ADD TO CART"}</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <div className="reviewsContainer">
            <h1 className="reviewTopTitle">{reviews?.length} {reviews?.length === 1 ? "Review" : "Reviews"} for {product.title}</h1>
            <div className="reviewsHeader">
                <Rating size={40} ratingValue={totalRating} readonly={true}/>
                <p>{reviews?.length === 0 ? "No Ratings" : (totalRating/20).toFixed(1) + " out of 5 stars"}</p>
            </div>
            <div className="reviewsForm">
                <button style={openReview ? {display: "none"} : null} className="reviewsFormOpenButton" onClick={() => setOpenReview(true)} disabled={!currentUser}>{currentUser ? "Leave a Review" : "Sign In to Leave a Review"}</button>
                <form style={openReview ? null : {display: "none"}} id='modalReviewFormID' className="reviewModalContainer" onSubmit={handleSubmitReview}>
                        <div className={`title ${loading ? 'lighterR' : ''}`}>
                            <h1>Write a Review for: <span>{product.title}</span></h1>
                        </div>
                        <div className={`body ${loading ? 'lighterR' : ''}`}>
                            <div id="RHI1" className="reviewHeadlineItem">
                                <label htmlFor="reviewHeadline">Overall Rating:</label>
                                <Rating id="reviewRating" onClick={handleRating} ratingValue={reviewRating} allowHalfIcon={true}/>
                            </div>
                            <div id="RHI2" className="reviewHeadlineItem">
                                <label htmlFor="reviewHeadline">Add Headline:</label>
                                <input type="text" id="reviewHeadline" placeholder="Title your review" onChange={(e) => setReviewTitle(e.target.value)} required/>
                            </div>
                            <div id="RHI3" className="reviewHeadlineItem">
                                <label id="reviewTextAriaThing" htmlFor="reviewDesc">Review:</label>
                                <textarea id="reviewDesc" placeholder="What did you like or dislike?" onChange={(e) => setReviewDesc(e.target.value)} required/>
                            </div>
                        </div>
                        <div className={`footer ${loading ? 'lighterR' : ''}`}>
                            <button onClick={handleCloseReview} id="reviewCancelBtn">Cancel</button>
                            <button type='submit'>Submit</button>
                        </div>
                    {loading && <div id="loadingUpdateReview"></div>}
                </form>
            </div>
            <div className="pastReviewsContainer">
                {reviews?.map((review) => (
                    <div key={review.id} className="pastReview">
                        <div className="pastReviewHeader">
                            <Rating size={32.5} ratingValue={review.rating} readonly={true}/>
                            <p><span>by</span> {(review?.userID === currentUser?._id) ? <span>{review.username} <span id="authorIndicator">(you)</span></span> : review.username}</p>
                        </div>
                        <div className="pastReviewBody">
                            <div className="pastReviewBox">
                                <h1 className="pastReviewTitle">{review.title}</h1>
                                <p className="pastReviewDate">Reviewed on {review.date}</p>
                            </div>
                            <p className="pastReviewDesc">{review.desc}</p>
                        </div>
                        {review?.verified && <div id="verifiedWrap"><p>VERIFIED</p><Check id="reviewVer"/></div>}
                        {((review?.userID === currentUser?._id) || isAdmin) && <p onClick={() => handleDeleteReview(review)} id="deleteAReview">Delete</p>}
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </Container>
    )
}

export default ProductPage;