import { useState } from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive"

    const Container = styled.div`
        position: relative;
        height: 40px;
        width: 100%;
        background-color: teal;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        ${mobile({ display: "none"})}
        z-index: 100;
    `
    const Content = styled.div`
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 500;
    `
    const Button = styled.div`
        position: absolute;
        right: 25px;
        font-size: .8rem;
        text-decoration: underline;
        font-weight: 200;
        cursor: pointer;
    `

function Announcement() {
    const [notVisible, setNotVisible] = useState(false)
    return (
        <Container className={notVisible && "goAwayPopup"}>
            <Content id='popupText'>Free Shipping on All Orders Over $50</Content>
            <Button id='popupText' onClick={() => setNotVisible(true)}>Dismiss</Button>
        </Container>
    )
}

export default Announcement
