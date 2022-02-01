import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Navbar from "../components/Navbar"
import Menu from "../components/Menu"
import Shopping from "../components/shopping/Shopping"
import Footer from "../components/Footer"
import { mobile, small, smaller } from "../responsive"

const Container = styled.div``
const Title = styled.h1`
    margin: 20px 56.75px 0;
    font-size: 2.65rem;
    ${small({ margin: "20px 50px 0" })}
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 1.125rem 0 2.35rem;
    ${small({ justifyContent: "flex-start" })}
    ${mobile({ margin: "0 1.125rem 0" })}
    `
const Filter = styled.div`
    margin: 20px 20px 5px;
    display: flex;
    align-items: center;
    ${small({ margin: "20px 0px 5px 20px" })}
    `
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${smaller({ display: "none" })}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    cursor: pointer;
`
const Option = styled.option``
const FilterTextContainer = styled.div`
    position: relative;
`
const CloseFilters = styled.h4`
position: absolute;
    font-size: .9rem;
    font-weight: 400;
    text-decoration: underline;
    margin-top: 2.5px;
    &:hover {
        color: red;
        cursor: pointer;
    }
`

function ShoppingPage() {
    useEffect(() => window.scrollTo(0, 0))
    useEffect(() => setFiltersOn(false), [])
    const location = useLocation()
    const category = location.pathname.split("/").at(-1)
    const [filters, setFilters] = useState({})
    const [filtersOn, setFiltersOn] = useState(true)
    const [sort, setSort] = useState("newest")

    function handleFilters(e) {
        setFilters({...filters, [e.target.name]: e.target.value})
        setFiltersOn(true)
    }
    function handleOffFilters() {
        document.getElementById("selectedFilterShopping1").selectedIndex = 0
        document.getElementById("selectedFilterShopping2").selectedIndex = 0
        setFilters({})
        setFiltersOn(false)
    }
    return (
        <Container>
        <Navbar />
        <Menu/>
        <Title>{category.charAt(0).toUpperCase() + category.slice(1)}</Title>
        <FilterContainer>
            <Filter>
            <FilterTextContainer>
                <FilterText>Filter Products:</FilterText>
                {filtersOn && <CloseFilters onClick={() => handleOffFilters()}>Clear</CloseFilters>}
            </FilterTextContainer>
            <Select name="color" id="selectedFilterShopping1" onChange={handleFilters}>
                <Option disabled selected hidden>Color</Option>
                <Option>Black</Option>
                <Option>Gray</Option>
                <Option>White</Option>
                <Option>Brown</Option>
                <Option>Green</Option>
                <Option>Blue</Option>
                <Option>Pink</Option>
                <Option>Red</Option>
            </Select>
            <Select name="size" id="selectedFilterShopping2" onChange={handleFilters}>
                <Option disabled selected hidden>Size</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
            </Select>
            </Filter>
            <Filter>
            <FilterText id="bybySortPrdct">Sort Products:</FilterText>
            <Select onChange={e => setSort(e.target.value)}>
                <Option value="newest">Newest</Option>
                <Option value="low">Price (Low)</Option>
                <Option value="high">Price (High)</Option>
            </Select>
            </Filter>
        </FilterContainer>
        <Shopping category={category} filters={filters} sort={sort}/>
        <Footer />
        </Container>
    )
}

export default ShoppingPage;