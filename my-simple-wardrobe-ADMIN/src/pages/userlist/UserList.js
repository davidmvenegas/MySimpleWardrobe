import "./userlist.css"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Delete, Star } from "@material-ui/icons"
import { DataGrid } from "@material-ui/data-grid"
import { getMembers, deleteMembers } from "../../redux/authRedux"
import Swal from 'sweetalert2'

function UserList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const members = useSelector((state) => state.member.members)

  const columns = [
    {field: "user", headerName: "Username", width: 225,
    renderCell: (params) => {
      return (
        <div className="userListUser">
            {params.row.isAdmin && <Star id="userStar"/>}
            <p>{params.row.username}</p>
          </div>
        )}
      },
    {field: "_id", headerName: "ID", width: 300},
    {field: "email", headerName: "Email", width: 300},
    {field: "action", headerName: "Action", width: 225,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <Delete className="userListDelete" onClick={() => handleDelete(params.row._id, params.row.username)}/>
          </>
        )}
      }
    ]

    const handleDelete = (id, username) => {
      Swal.fire({
        title: `DELETE ${username}?`,
        text: "Are you sure?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteMembers(id, dispatch)
          Swal.fire(
            `${username} has been Deleted`,
          )
        }}
      ).then(navigate("/"))
    }
    useEffect(() => {getMembers(dispatch)}, [dispatch])

  return (
    <div className="userList">
      <div className="product-header">
        <h1 id="productHeaderTitle">USERS</h1>
        <Link to="/newUser">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid getRowId={(row) => row._id} rows={members} columns={columns} pageSize={10} rowsPerPageOptions={[10]} checkboxSelection disableSelectionOnClick />
    </div>
  )
}
export default UserList