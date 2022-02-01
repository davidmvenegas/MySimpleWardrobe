import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ShoppingCartOutlined, Person, SupervisorAccount } from '@material-ui/icons'
import { Badge } from '@mui/material'
import LogoImage from '../images/logo.png'
import { logout } from "../redux/userRedux"
import { mobile, medium, small } from "../responsive"

const Container = styled.div`
    height: 70px;
    background-color: white;
    margin-bottom: .25rem;
    box-shadow: 0 2px 6px -2px #00000045;
    ${small({ height: "60px" })}
    ${mobile({ height: "100px", paddingTop: "45px" })}
`
const Wrapper = styled.div`
    padding: 13.5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    height: 2rem;
    ${medium({ flex: 1 })}
    ${small({ flex: 0 })}
    ${mobile({ display: "none" })}
`
const ImageLogo = styled.img`
    height: 3.75rem;
    width: 3.75rem;
    cursor: pointer;
    ${small({ height: "3rem", width: "3rem" })}
`
const Center = styled.div`
    flex: 1;
    text-align: center;
    ${medium({ flex: 3})}
    ${mobile({ flex: 0 })}
    `
const Logo = styled.h1`
    font-weight: 600;
    cursor: pointer;
    ${mobile({ position: "absolute", fontSize: "26px", top: "10px", left: 0, width: "100%", zIndex: 100 })}
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${medium({ flex: 1.75 })}
    ${mobile({ justifyContent: "center" })}
    `
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${small({ marginLeft: "15px", fontSize: "12px" })}
    ${mobile({ fontSize: "15px", margin: "0 15px" })}
`

function Navbar({loading}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.user.currentUser)
    function handleLogout() {
        dispatch(logout())
        navigate("/")
    }
    return (
        <Container style={loading ? {display: "none"} : null}>
            <Wrapper>
                <Left>
                    <ImageLogo onClick={() => navigate('/')} src={LogoImage}/>
                </Left>
                <Center>
                    <Logo onClick={() => navigate('/')}>My Simple Wardrobe.</Logo>
                </Center>
                <Right>
                    {!user &&
                    <Fragment>
                        <MenuItem onClick={() => navigate('/register')}>REGISTER</MenuItem>
                        <MenuItem onClick={() => navigate('/login')}>SIGN IN</MenuItem>
                    </Fragment>}
                    {user &&
                    <Fragment>
                        <MenuItem onClick={handleLogout}>LOG OUT</MenuItem>
                        <MenuItem onClick={() => navigate('/profile')}>{user.isAdmin ? <SupervisorAccount style={{fontSize: "2rem"}}/> : <Person style={{fontSize: "2rem"}}/>}</MenuItem>
                    </Fragment>}
                    <MenuItem id="badgeCart" onClick={() => navigate('/cart')}>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined style={{fontSize: "1.75rem"}}/>
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
