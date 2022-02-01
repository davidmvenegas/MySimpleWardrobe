import styled from "styled-components";
import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import { medium, small } from "../responsive";

const Container = styled.div`
    display: flex;
    padding: 2rem 5rem 1rem;
    background-color: whitesmoke;
    width: 100%;
    ${small({ flexDirection: "column", padding: "0", display: "grid", placeContent: "center" })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1`
    font-size: 24pxs;
    font-weight: 600;
`
const Desc = styled.p`
    margin: 10px 0px 20px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(i) => i.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${medium({ display: "none" })}
`
const Title = styled.h3`
    margin-bottom: 20px;
    font-size: 1.5rem;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 5px;
    text-decoration: underline;
`
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${small({ backgroundColor: "#fff8f8", marginBottom: "1rem" })}
`
const ContactItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`

function Footer({loading}) {
    return (
    <Container style={loading ? {display: "none"} : null}>
        <Left>
            <Logo>My Simple Wardrobe</Logo>
            <Desc>&copy; 2022 - Built and Designed by <a id="personalLink" target="_blank" href="https://github.com/davidmvenegas" rel="noreferrer">David Venegas</a></Desc>
            <SocialContainer>
            <SocialIcon color="3B5999">
                <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
                <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
                <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
                <Pinterest />
            </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
            <ListItem>Home</ListItem>
            <ListItem>Terms</ListItem>
            <ListItem>About</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Help</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem>
                <Room style={{marginRight:"10px"}}/> 123 Main Street, Clothing Lane 10301
            </ContactItem>
            <ContactItem>
                <Phone style={{marginRight:"10px"}}/> 123-456-7890
            </ContactItem>
            <ContactItem>
                <MailOutline style={{marginRight:"10px"}} /> contact@mysimplewardrobe.com
            </ContactItem>
        </Right>
    </Container>
    )
}

export default Footer