import leftArrow from "../images/left-arrow.svg"
import rightArrow from "../images/right-arrow.svg"

function BtnSlider({ direction, moveSlide }) {
return (
    <button id="sliderButtonMain" onClick={moveSlide} className={direction === "next" ? "btn-slide next" : "btn-slide prev"}>
        <img src={direction === "next" ? rightArrow : leftArrow} alt="img"/>
    </button>
    )
}
export default BtnSlider