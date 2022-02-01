import "./product.css"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateProduct } from "../../redux/authRedux"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from "../../firebase"

function Product() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const productId = location.pathname.split("/").at(-1)
    const product = useSelector((state) => state.product.products.find((product) => product._id === productId))
    const [inputs, setInputs] = useState({title: product.title, price: product.price, desc: product.desc, inStock: product.inStock})
    const [file, setFile] = useState(product.img)
    const [categories, setCategories] = useState([product.categories])
    const [sizes, setSizes] = useState([product.size])
    const [colors, setColors] = useState([product.color])

    function handleChange(e) {
        setInputs(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }
    const handleCategories = (e) => setCategories(e.target.value.split(","))
    const handleSizes = (e) => setSizes(e.target.value.split(","))
    const handleColors = (e) => setColors(e.target.value.split(","))
    
    function handleSubmit(e) {
        e.preventDefault()
        if (product.img !== file) {
            setLoading(true)
            const fileName = new Date().getTime() + file.name
            const storage = getStorage(app)
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed', 
                (progress) => {console.group(progress)},
                (error) => {alert(error)},
                () => {getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL)
                const finalProduct = {...inputs, img: downloadURL, categories: categories, size: sizes, color: colors}
                updateProduct(productId, finalProduct, dispatch)
            })})
            setTimeout(() => {navigate("/products")}, 5000)
        } else {
            setLoading(true)
            const finalProduct = {...inputs, img: file, categories: categories, size: sizes, color: colors}
            updateProduct(productId, finalProduct, dispatch)
            setTimeout(() => {navigate("/products")}, 2000)
        }
    }

    return (
    <div className="product">
        <div className="productTitleContainer">
            <h1 className="productTitle">UPDATE PRODUCT</h1>
        </div>
        <div className="productBottom">
            <form className="productForm" onSubmit={handleSubmit}>
                <div className={`productFormLeft ${loading ? 'lighter' : ''}`}>
                    <label>Title:</label>
                    <input type="text" name="title" placeholder={product.title} onChange={handleChange}/>
                    <label>Description:</label>
                    <input type="text" name="desc" placeholder={product.desc} onChange={handleChange}/>
                    <label>Price:</label>
                    <input type="number" name="price" placeholder={`$${product.price}`} onChange={handleChange}/>
                    <label>Categories:</label>
                    <input type="text" placeholder={product.categories} onChange={handleCategories}/>
                    <label>Colors:</label>
                    <input type="text" placeholder={product.color} onChange={handleColors}/>
                    <label>Sizes:</label>
                    <input type="text" placeholder={product.size} onChange={handleSizes}/>
                    <label>In Stock:</label>
                    <select name="inStock" id="idStock" onChange={handleChange}>
                        <option value="true" selected={product.inStock}>Yes</option>
                        <option value="false" selected={!product.inStock}>No</option>
                    </select>
                </div>
                <div className="productFormRight">
                    <div className={`productUpload ${loading ? 'lighter' : ''}`}>
                        <img src={product.img} alt="" className="productUploadImg" />
                        <input type="file" id="file" accept=".png, .jpg, .jpeg" onChange={e=>setFile(e.target.files[0])}/>
                    </div>
                    {loading && <div id="loading"></div>}
                    <button type="submit" className={`productButton ${loading ? 'lighter' : ''}`}>Update</button>
                </div>
            </form>
        </div>
    </div>
    )
}
export default Product