import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Add, ArrowBack, Remove } from "@material-ui/icons"
import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Wishlist from "../components/profile/WishList"
import { large, medium, mobile, small, smaller, veryLarge } from "../responsive"
import { userRequest } from '../request' 
import { removeAllProduct, removeProduct, addCartProduct } from '../redux/cartRedux'
import Swal from 'sweetalert2'
import StripeCheckout from "react-stripe-checkout"
const KEY = process.env.REACT_APP_TEST_STRIPE_KEY

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    min-height: 38.5rem;
    ${small({ padding: "25px 0px", minHeight: "25rem" })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    ${small({ padding: "10px 0px 0px" })}

`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(i) => i.type === "filled" && "none"};
    color: ${(i) => i.type === "filled" && "white"};
    background-color: ${(i) => i.type === "filled" ? "black" : "transparent"};
    &:disabled {
        background-color: #aaa;
        cursor: not-allowed;
    }
    ${small({ display: "none" })}
`
const TopTexts = styled.div`
    margin-left: -30px;
    ${small({ marginLeft: "0px", margin: "1rem auto" })}
`
const TopText = styled.span`
    cursor: pointer;
    margin: 0px 10px;
    &:hover {
        text-decoration: underline;
    }
    ${small({ fontSize: "1.175rem" })}
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${small({ position: "relative" })}
`
const Info = styled.div`
    width: 74vw;
    min-height: 25rem;
    ${small({ width: "90vw", marginLeft: "5vw" })}
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
`
const ProductDetail = styled.div`
    flex: 4;
    display: flex;
`
const Image = styled.img`
    width: 200px;
    margin: 0 0 .5rem;
    cursor: pointer;
    transition: all .2s ease-in;
    &:hover {
        transform: scale(1.05);
    }
    ${small({ width: "150px" })}
    ${mobile({ width: "125px", height: "125px", margin: "1rem 0" })}
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span`
    ${mobile({ display: "none" })}
    `
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #${(i) => i.color};
    ${mobile({ margin: "10px 0" })}
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${veryLarge({ marginRight: "2.5rem" })}
    ${large({ marginRight: "6.5rem" })}
    ${medium({ marginRight: "7.5rem" })}
    ${small({ marginRight: "1rem" })}
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 22.5px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    height: 2.085rem;
    width: auto;
    padding: 0 .5rem;
    border-radius: .5rem;
    text-align: center;
    ${small({ fontSize: "20px" })}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${small({ fontSize: "25px", marginTop: ".5rem", marginBottom: "-.5rem" })}
`
const Hr = styled.hr`
    background-color: #ddd;
    border: none;
    height: 1px;
    margin-bottom: 15px;
`
const HrMobile = styled.hr`
    background-color: transparent;
    border: none;
    height: 0;
    ${small({ marginTop: "24rem" })}
`
const Summary = styled.div`
    flex: 1;
    position: fixed;
    right: 2.25rem;
    margin-top: .5rem;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px 30px;
    max-height: 43vh;
    background-color: white;
    ${medium({ width: "30%" })}
    ${small({ position: "absolute", top: "1rem", left: "50%", transform: "translateX(-50%)", width: "80%" })}
`
const SummaryTitle = styled.h1`
    font-weight: 200;
    ${medium({ fontSize: "1.5rem", textAlign: "center" })}
    ${small({ fontSize: "2rem" })}
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(i) => i.type === "total" && "500"};
    font-size: ${(i) => i.type === "total" && "24px"};
    ${medium({ margin: "20px 0" })}
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
    ${small({ width: "50%", marginLeft: "25%" })}
    ${smaller({ width: "100%", marginLeft: "0%" })}
`
const RemoveButton = styled.h3`
    font-size: .925rem;
    font-weight: 400;
    text-decoration: underline;
    margin-top: 1.325rem;
    &:hover {
        cursor: pointer;
        color: red;
    }
`
const ReminderContainer = styled.div`
    height: 25rem;
    width: 100%;
    display: grid;
    place-content: center;
    margin-left: -75vw;
    margin-top: .5rem;
    border-top: 1px solid lightgray;
    ${small({ borderTop: "none", marginLeft: "-100vw" })}
`
const ReminderContent = styled.h1`
    font-size: 1.5rem;
    font-weight: 200;
    color: #444;
`

function CartPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const currentUser = useSelector(state => state.user.currentUser)
    const currentWishlist = useSelector(state => state.wishlist.wishlist)
    const [stripeToken, setStripeToken] = useState(null)
    const [wishlist, setWishlist] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleRemoveAllProduct(product) {
        const price = product.price
        const quantity = product.quantity
        dispatch(removeAllProduct({product, price, quantity}))
    }
    function handleAddProduct(product) {
        const price = product.price
        dispatch(addCartProduct({product, price}))
    }
    function handleRemoveProduct(product) {
        const price = product.price
        if (product.quantity === 1) {
            handleRemoveAllProduct(product)
        } else {
            dispatch(removeProduct({product, price}))
        }
    }

    useEffect(() => {
        async function makeRequest() {
            setLoading(true)
            try {
                const response = await userRequest.post("checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100
                })
                const responseData = response.data
                const cartState = {responseData, cart}
                navigate("/success", {state: cartState})
            } catch (error) {
                console.error(error)
            }
        }
        stripeToken && makeRequest()
    }, [cart, cart.total, dispatch, navigate, stripeToken])

    const setToken = (token) => setStripeToken(token)
    const shippingAmount = cart.total > 0 ? 6.99 : 0
    const totalAmount = cart.total >= 50 ? parseInt(cart.total) : (cart.total + shippingAmount).toFixed(2)

    function handleBuy() {
        Swal.fire({
            icon: 'warning',
            title: "<b>DON'T USE A REAL CARD</b>",
            text: "This checkout proccess uses Stripe, but has been changed to Test Mode to disable authentic card information. Feel free to use the number below to enjoy the experience!",
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Got it!',
            footer: '<p><b>Copy:</b>&nbsp; 4242 4242 4242 4242</p>'
        }).then((result) => {if (result.isConfirmed) {
            document.getElementById("stripeButton").click()
            }
        })
    }

    return (
        <Container>
            <Navbar loading={loading} />
            <Wrapper>
            <ArrowBack style={loading ? {opacity: 0, pointerEvents: "none"} : null} id="arrowBackCart" onClick={() => navigate(-1)}/>
                <Title style={loading ? {opacity: 0, pointerEvents: "none"} : null}>YOUR BAG</Title>
                <Top style={loading ? {opacity: 0, pointerEvents: "none"} : null}>
                    <TopButton style={wishlist ? {opacity: 0, pointerEvents: "none"} : null} onClick={() => navigate(-1)}>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText style={!wishlist ? {textDecoration: "underline"} : null} onClick={() => setWishlist(false)}>Shopping Bag({cart.quantity})</TopText>
                        {currentUser && <TopText style={wishlist ? {textDecoration: "underline"} : null} onClick={() => setWishlist(true)}>Favorites ({currentWishlist.length})</TopText>}
                    </TopTexts>
                    <TopButton style={(loading || wishlist) ? {opacity: 0, pointerEvents: "none"} : null} disabled={totalAmount <= 0} type="filled" onClick={() => handleBuy()}>CHECKOUT NOW</TopButton>
                </Top>
                {!loading ? <div>
                {wishlist ?
                <Wishlist/> :
                <Bottom>
                <Info>
                <HrMobile />
                    {cart.products.map((product) => (
                        <Fragment key={product._id+product.color+product.size}>
                            <Product>
                                <ProductDetail>
                                    <Image src={product.img} onClick={() => navigate(`/product/${product._id}`)}/>
                                    <Details>
                                        <ProductName><b>Product:</b> {product.title}</ProductName>
                                        <ProductId><b>ID:</b> {(product._id).substring(0, 10)}</ProductId>
                                        <ProductColor color={product.color} />
                                        <ProductSize><b>Size:</b> {product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                                    <ProductAmountContainer>
                                        <Remove style={{cursor:"pointer"}} onClick={() => handleRemoveProduct(product)}/>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Add style={{cursor:"pointer"}} onClick={() => handleAddProduct(product)}/>
                                    </ProductAmountContainer>
                                    <RemoveButton onClick={() => handleRemoveAllProduct(product)}>Remove</RemoveButton>
                                </PriceDetail>
                            </Product>
                            <Hr />
                        </Fragment>
                    ))}
                </Info>
                {cart.total > 0 ?
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal:</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping:</SummaryItemText>
                        <SummaryItemPrice>$ {shippingAmount}</SummaryItemPrice>
                    </SummaryItem>
                    {cart.total >= 50 && <SummaryItem>
                        <SummaryItemText>Free Shipping Discount:</SummaryItemText>
                        <SummaryItemPrice>$ -6.99</SummaryItemPrice>
                    </SummaryItem>}
                    <SummaryItem type="total">
                        <SummaryItemText>Total:</SummaryItemText>
                        <SummaryItemPrice>$ {totalAmount}</SummaryItemPrice>
                    </SummaryItem>
                    <Button disabled={totalAmount <= 0} onClick={() => handleBuy()}>CHECKOUT NOW</Button>
                    <StripeCheckout
                        name="My Simple Wardrobe"
                        billingAddress
                        shippingAddress
                        allowRememberMe
                        description={`Your total is $${totalAmount}`}
                        amount={totalAmount * 100}
                        token={setToken}
                        stripeKey={KEY}
                        >
                        <button id='stripeButton' style={{display: "none", pointerEvents: "none", opacity: "0"}}></button>
                    </StripeCheckout>
                </Summary> :
                <ReminderContainer>
                    <ReminderContent>Bag is Empty</ReminderContent>
                </ReminderContainer>}
                </Bottom>}
                </div> : 
                <p id='LOADINGcart'>Loading...</p>}
            </Wrapper>
            <Footer loading={loading} />
        </Container>
    )
}

export default CartPage;