import './categories.css'
import { useNavigate } from "react-router-dom"
import { ChevronRight } from "@material-ui/icons"
import Hat from '../images/bestProducts/Hat.png'
import Hoodie from '../images/bestProducts/Hoodie.png'
import Pant from '../images/bestProducts/Pant.png'
import Shoe from '../images/bestProducts/Shoe.png'
import Shirt from '../images/bestProducts/Shirt.png'
import Blouse from '../images/bestProducts/Blouse.png'

function Categories() {
    const navigate = useNavigate()
    return (
        <div className='categoriesContainer'>
            <h1 className='featuredProductsTitle'>Featured Products</h1>
            <div className="categoriesWrapper">
                <div onClick={() => navigate('/product/61ecbaa88cef57fe3537d81a')} className="aCategory">
                    <img src={Hat} alt="img" />
                    <div className="aCategoryText">
                        <h1>Washed Baseball Cap</h1>
                        <div className="buttonWrapperCat">
                            <button>Buy Now</button><ChevronRight id="catRight"/>
                        </div>
                    </div>
                </div>
                <div onClick={() => navigate('/product/61ecc0528cef57fe3537d82a')} className="aCategory">
                    <img src={Pant} alt="img" />
                    <div className="aCategoryText">
                        <h1>Althletic Jogger</h1>
                        <div className="buttonWrapperCat">
                            <button>Buy Now</button><ChevronRight id="catRight"/>
                        </div>
                    </div>
                </div>
                <div onClick={() => navigate('/product/61ecbfdc8cef57fe3537d828')} className="aCategory">
                    <img src={Blouse} alt="img" />
                    <div className="aCategoryText">
                        <h1>Blouse</h1>
                        <div className="buttonWrapperCat">
                            <button>Buy Now</button><ChevronRight id="catRight"/>
                        </div>
                    </div>
                </div>
                <div onClick={() => navigate('/product/61ecb2768cef57fe3537d80c')} className="aCategory">
                    <img src={Shoe} alt="img" />
                    <div className="aCategoryText">
                        <h1>Lace-Up Sneaker</h1>
                        <div className="buttonWrapperCat">
                            <button>Buy Now</button><ChevronRight id="catRight"/>
                        </div>
                    </div>
                </div>
                <div onClick={() => navigate('/product/61ec85b48cef57fe3537d7f2')} className="aCategory">
                    <img src={Shirt} alt="img" />
                    <div className="aCategoryText">
                        <h1>Crew T-Shirt</h1>
                        <div className="buttonWrapperCat">
                            <button>Buy Now</button><ChevronRight id="catRight"/>
                        </div>
                    </div>
                </div>
                <div onClick={() => navigate('/product/61ecc8568cef57fe3537d834')} className="aCategory">
                    <img src={Hoodie} alt="img" />
                    <div className="aCategoryText">
                        <h1>Shirpa Jacket</h1>
                        <div className="buttonWrapperCat">
                            <button>Buy Now</button><ChevronRight id="catRight"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories;
