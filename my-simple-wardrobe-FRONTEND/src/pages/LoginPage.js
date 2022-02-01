import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginRequest } from "../redux/authRedux"
import styled from "styled-components"
import {large, medium, mobile, small} from "../responsive"
import LogoImg from '../images/siteLogo.png'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: whitesmoke;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 30%;
    padding: 25px 30px;
    background-color: white;
    ${large({ width: "45%" })}
    ${medium({ width: "55%" })}
    ${small({ width: "65%" })}
    ${mobile({ width: "90%" })}
    `
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: .25rem;
    `
const Form = styled.form`
    display: flex;
    flex-direction: column;
    `
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0 5px;
    padding: 12px 10px;
    `
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
        background-color: gray;
        cursor: not-allowed;
    }
    `
const Link = styled.a`
    margin: 5px 0px;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
    ${small({ fontSize: "12px" })}
`
const Error = styled.span`
    color: red;
`
const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0 0;
`

function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const { isFetching, currentUser, error } = useSelector(state => state.user)
    
    function handleSubmit(e) {
        e.preventDefault()
        loginRequest(dispatch, {email, password})
    }

    useEffect(() => currentUser && navigate("/"), [currentUser, navigate])

    return (
        <Container>
            <div onClick={() => navigate('/')} id="GOtoHome"><img src={LogoImg} alt="Logo" /> My Simple Wardrobe.</div>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form onSubmit={handleSubmit}>
                    <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} type="email" required />
                    <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" required />
                    <ButtonWrapper>
                        <Button type="submit" disabled={isFetching || currentUser}>LOGIN</Button>
                        <Link onClick={() => navigate('/register')}>CREATE A NEW ACCOUNT</Link>
                    </ButtonWrapper>
                    {error && <Error>Something went wrong...</Error>}
                </Form>
            </Wrapper>
        </Container>
    )
}

export default LoginPage;