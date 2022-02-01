import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Landing from '../components/Landing'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import { getReviews } from "../redux/authRedux"

function HomePage() {
    const dispatch = useDispatch()
    useEffect(() => window.scrollTo(0, 0), [])
    useEffect(() => getReviews(dispatch), [dispatch])
    return (
        <Fragment>
            <Announcement/>
            <Navbar/>
            <Landing/>
            <Categories/>
            <Footer/>
        </Fragment>
    )
}

export default HomePage
