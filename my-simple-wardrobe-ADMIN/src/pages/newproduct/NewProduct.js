import "./newproduct.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addProduct } from "../../redux/authRedux"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from "../../firebase"

function NewProduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])

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
        const product = {...inputs, img: downloadURL, categories: categories, size: sizes, color: colors}
        addProduct(product, dispatch)
      })}
    )
    setTimeout(() => {navigate("/products")}, 2000)
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className={`addProductItem ${loading ? 'lighter' : ''}`}>
          <label>Name</label>
          <input type="text" name="title" placeholder="Name..." onChange={handleChange} required/>
        </div>
        <div className={`addProductItem ${loading ? 'lighter' : ''}`}>
          <label>Description</label>
          <input type="text" name="desc" placeholder="Description..." onChange={handleChange} required/>
        </div>
        <div className={`addProductItem ${loading ? 'lighter' : ''}`}>
          <label>Price</label>
          <input type="number" name="price" placeholder="$0" onChange={handleChange} required/>
        </div>
        <div className={`addProductItem ${loading ? 'lighter' : ''}`}>
          <label>Categories</label>
          <input type="text" placeholder="(add seperated by commas)" onChange={handleCategories} required/>
        </div>
        <div className={`addProductItem ${loading ? 'lighter' : ''}`}>
          <label>Sizes</label>
          <input type="text" placeholder="(add seperated by commas)" onChange={handleSizes} required/>
        </div>
        <div className={`addProductItem ${loading ? 'lighter' : ''}`}>
          <label>Colors</label>
          <input type="text" placeholder="(add seperated by commas)" onChange={handleColors} required/>
        </div>
        <div className={`addProductItem ${loading ? 'lighter' : ''}`}>
          <label>Image</label>
          <input type="file" id="file" accept=".png, .jpg, .jpeg" onChange={e=>setFile(e.target.files[0])} required/>
        </div>
        {loading && <div id="loadingNewProduct"></div>}
        <button type="submit" className={`addProductButton ${loading ? 'lighter' : ''}`}>Create</button>
      </form>
    </div>
  )
}
export default NewProduct