import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerRequest } from "../redux/authRedux"
import Swal from 'sweetalert2'
import styled from "styled-components"
import { large, medium, mobile, small } from "../responsive"
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
    padding: 40px 25px;
    background-color: white;
    margin-top: 2rem;
    ${large({ width: "45%" })}
    ${medium({ width: "55%" })}
    ${small({ width: "65%" })}
    ${mobile({ width: "90%" })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: .5rem;
    text-align: center;
`
const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 17.5px 10px 0px 0px;
    padding: 12px 10px;
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
    ${mobile({ margin: "20px 0 10px" })}
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
`
const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0 0;
    width: 100%;
`
const Link = styled.a`
    margin: 5px 0px;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
`
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

function RegisterPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const { isFetching, currentUser, error } = useSelector(state => state.user)

    function checkPassword() {
        if (password !== confirmPassword) {
            Swal.fire('Error', "Passwords don't match", 'error')
            return false
        } else if (password.length < 5) {
            Swal.fire('Error', "Password must be longer than 4 characters", 'error')
            return false
        }
        return true
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (checkPassword()) {
            registerRequest(dispatch, {username, password, email})
        }
    }

    useEffect(() => currentUser && navigate("/"), [currentUser, navigate])

    return (
        <Container>
        <div onClick={() => navigate('/')} id="GOtoHome"><img src={LogoImg} alt="Logo" /> My Simple Wardrobe.</div>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form onSubmit={handleSubmit}>
                <InputWrapper>
                    <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                    <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} type="email" required/>
                    <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" required />
                    <Input placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} type="password" required/>
                </InputWrapper>
                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance to the <b id="termsReg" onClick={() => navigate('/terms')}>TERMS AND CONDITIONS</b>
                </Agreement>
                <ButtonWrapper>
                    <Button type="submit" disabled={isFetching || currentUser}>REGISTER</Button>
                    <Link onClick={() => navigate('/login')}>GO TO SIGN IN</Link>
                </ButtonWrapper>
                {error && <Error>Something went wrong...</Error>}
            </Form>
        </Wrapper>
        </Container>
    )
}

export default RegisterPage