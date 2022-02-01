import "./productlist.css"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Delete } from "@material-ui/icons"
import { DataGrid } from "@material-ui/data-grid"
import { getProducts, deleteProducts } from "../../redux/authRedux"
import Swal from 'sweetalert2'

function ProductList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector((state) => state.product.products)
  const columns = [
    {field: "product", headerName: "Product", width: 225,
    renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt=""/>
            {params.row.title}
          </div>
        )}},
        {field: "_id", headerName: "ID", width: 300},
        {field: "inStock", headerName: "In Stock", width: 185},
        {field: "price", headerName: "Price $", width: 185},
        {field: "action", headerName: "Actions", width: 175,
        renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Update</button>
            </Link>
            <Delete className="productListDelete" onClick={() => handleDelete(params.row._id, params.row.title)}/>
          </>
        )}}
      ]

      const handleDelete = (id, title) => {
        Swal.fire({
          title: `DELETE ${title}?`,
          text: "Are you sure?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Delete'
        }).then((result) => {
          if (result.isConfirmed) {
            deleteProducts(id, dispatch)
            Swal.fire(
              `${title} has been Deleted`,
            )
          }}
        ).then(navigate("/products"))
      }
      useEffect(() => {getProducts(dispatch)}, [dispatch])

  return (
      <div className="productList">
        <div className="product-header">
          <h1 id="productHeaderTitle" >PRODUCTS</h1>
          <Link to="/newproduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        <DataGrid getRowId={(row) => row._id} rows={products} columns={columns} pageSize={10} rowsPerPageOptions={[10]} checkboxSelection disableSelectionOnClick />
      </div>
  )
}
export default ProductList