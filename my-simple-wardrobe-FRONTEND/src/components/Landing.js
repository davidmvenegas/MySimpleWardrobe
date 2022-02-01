import './landing.css'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import BtnSlider from './BtnSlider'
import { ChevronRight } from "@material-ui/icons"
import { dataSlider } from '../LandingData'

function Landing() {
    const navigate = useNavigate()
    const [slideIndex, setSlideIndex] = useState(1)
    const timeoutRef = useRef(null)

    const nextSlide = () => slideIndex !== dataSlider.length ? setSlideIndex(slideIndex + 1) : setSlideIndex(1)
    const prevSlide = () => slideIndex !== 1 ? setSlideIndex(slideIndex - 1) : setSlideIndex(dataSlider.length)
    const moveDot = index => setSlideIndex(index)

    useEffect(() => {
        resetTimeout()
        timeoutRef.current = setTimeout(() => nextSlide(), 4000)
        return () => resetTimeout()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slideIndex])

    const resetTimeout = () => timeoutRef.current && clearTimeout(timeoutRef.current)

    return (
        <div className="landingContainer">
            <div className="landingWrapper">
                <div className="sliderContainerWrapper">
                    <div id='sliderMain' className="container-slider">
                        {dataSlider.map((obj, index) => (
                            <div key={index} className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
                                <img src={obj.img} alt='pic' />
                                    <div className="slideTextWrapper">
                                        <h1>{obj.title}</h1>
                                        <h4>{obj.subtitle}</h4>
                                        <div id='sliderButtonWrapperIhateyou'><button id='sliderButtonHome' onClick={() => navigate(`/products/${obj.category}`)}>Start Shopping</button><ChevronRight id="slideChev"/></div>
                                    </div>
                            </div>
                        ))}
                        <BtnSlider moveSlide={nextSlide} direction={"next"} />
                        <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
                        <div id='containerDots' className="container-dots">
                            {Array.from({length: 5}).map((item, index) => (
                                <div key={index} onClick={() => moveDot(index + 1)} className={slideIndex === index + 1 ? "dot active" : "dot"}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;
