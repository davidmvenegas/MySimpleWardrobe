import { useEffect, useState } from "react"
import styled from "styled-components"
import ShoppingItem from "./ShoppingItem"
import { generalRequest } from "../../request"
import { medium, small } from "../../responsive"


const Container = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    grid-gap: 2.5px;
    flex-wrap: wrap;
    padding: 20px;
    margin: 0 2rem;
    min-height: 35rem;
    ${medium({ gridTemplateColumns: "auto auto", gridTemplateRows: "auto auto" })}
    ${small({ gridTemplateColumns: "auto", gridTemplateRows: "auto" })}
`
const Reminder = styled.h1`
    position: absolute;
    left: 50%;
    top: 57.5%;
    transform: translate(-50%, -57.5%);
    font-size: 1.5rem;
    font-weight: 200;
    color: #888;
`

function ProductPageItem({category, filters, sort}) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await generalRequest.get(`products?category=${category}`)
                setProducts(response.data.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value))))
            } catch (error) {
                console.error(error)
            }
        }
        getProducts()
    }, [category, filters])

    useEffect(() => {
        if (sort === "newest") {
            setProducts((items) => [...items].sort((a, b) => a.createdAt - b.createdAt))
        } else if (sort === "low") {
            setProducts((items) => [...items].sort((a, b) => a.price - b.price))
        } else if (sort === "high") {
            setProducts((items) => [...items].sort((a, b) => b.price - a.price))
        }
    }, [sort])

    return (
        <Container>
            {products.length === 0 ?
            <Reminder>No Items Match Those Filters</Reminder> :
                products.map((item) => (
                    <ShoppingItem key={item._id} item={item}/>
                ))
            }
        </Container>
    )
}

export default ProductPageItem
