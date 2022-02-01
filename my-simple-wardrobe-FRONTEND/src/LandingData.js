import { v4 as uuidv4 } from "uuid"
import shirtSlide from './images/slider/shirtSlide.jpg'
import pantSlide from './images/slider/pantSlide.jpg'
import hatSlide from './images/slider/hatSlide.jpg'
import shoeSlide from './images/slider/shoeSlide.jpg'
import hoodieSlide from './images/slider/hoodieSlide.jpg'

export const dataSlider = [
    {
        id: uuidv4(),
        title: "Shirts",
        subtitle: "Look your best with these Closet Staples",
        category: "shirts",
        img: shirtSlide
    },
    {
        id: uuidv4(),
        title: "Pants",
        subtitle: "Tough and Comfortable - Find your Style",
        category: "pants",
        img: pantSlide
    },
    {
        id: uuidv4(),
        title: "Outerware",
        subtitle: "Stay Warm every day of the year",
        category: "outerware",
        img: hoodieSlide
    },
    {
        id: uuidv4(),
        title: "Shoes",
        subtitle: "Slip into easy Style and Comfort.",
        category: "shoes",
        img: shoeSlide
    },
    {
        id: uuidv4(),
        title: "Accessories",
        subtitle: "Finish the look with Hats and Sunglasses",
        category: "accessories",
        img: hatSlide
    },
]