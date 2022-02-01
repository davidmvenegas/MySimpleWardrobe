import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { large, medium, mobile, small } from "../responsive"
import { ArrowBack } from "@material-ui/icons"
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
    width: 45%;
    padding: 40px 25px;
    background-color: white;
    ${large({ width: "65%" })}
    ${medium({ width: "75%" })}
    ${small({ width: "80%", marginTop: "5rem" })}
    ${mobile({ width: "90%", marginTop: "8.5rem" })}
    `
const Title = styled.h1`
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 1rem;
    text-align: center;
    ${small({ marginBottom: "2rem" })}
`
const Information = styled.p`
    font-size: 16px;
    font-weight: 400;
    text-align: center;
`

function Terms() {
    const navigate = useNavigate()

    return (
        <Container>
        <div onClick={() => navigate('/')} id="GOtoHome"><img src={LogoImg} alt="Logo" /> My Simple Wardrobe.</div>
        <ArrowBack id="arrowBackOrder" onClick={() => navigate(-1)}/>
        <Wrapper>
            <Title>TERMS AND CONDITIONS</Title>
            <Information>
                To enable our systems to recognize your browser or device, this site uses cookies and other identifiers. This information is kept private, securly stored to GDPR Compliance standards
                and never shared with advertisers. <br /><br /> This site also uses JWT(JSON Web Tokens) tokens to log in and out users. These encrypt your password before they ever leave the site, and replace 
                your plain-text password with a AES encrypted Token wich is used in future logins. Every token is designed to last a maximum of three days in order to ensure highest security. <br /><br />
                For payment methods the checkout process - while PCI complient and secure - is for demonstrational purposes only and does not accept live payments at this time. You are given
                clear warning before a "purchase" to use the developer test card to ensure no actual money is sent. If you have any questions or concerns feel free to reach out to <b>contact@mysimplewardrobe.com</b>
            </Information>
        </Wrapper>
        </Container>
    )
}

export default Terms