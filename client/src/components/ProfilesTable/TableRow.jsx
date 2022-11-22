import { Trash, PencilSquare, Eye } from 'react-bootstrap-icons'
import { ProfilesContext } from '../../contexts/profilesContext'
import { useContext } from 'react'
import { SET_CURRENT_PROFILE } from '../../constants/actionTypes'
import { useNavigate } from 'react-router-dom'

const Td = ({ text }) => {
  return <td title={text}>{text}</td>
}

const iconStyle = { padding: 0, marginRight: '0.75rem' }

const TableRow = ({ data, index }) => {
  const {
    setShowDeleteModal,
    setShowEditModal,
    setShowProfileModal,
    dispatch,
  } = useContext(ProfilesContext)

  const navigate = useNavigate()

  const onDeleteClick = () => {
    dispatch({ type: SET_CURRENT_PROFILE, payload: data })
    setShowDeleteModal(true)
  }

  const onEditClick = () => {
    dispatch({ type: SET_CURRENT_PROFILE, payload: data })
    setShowEditModal(true)
  }

  const onViewClick = () => {
    dispatch({ type: SET_CURRENT_PROFILE, payload: data })
    setShowProfileModal(true)
    navigate(`/profile/${data._id}`)
  }

  return (
    <tr>
      <th scope="row" title={index + 1}>
        {index + 1}
      </th>
      <Td text={data?.first_name}></Td>
      <Td text={data?.last_name}></Td>
      <Td text={data?.email}></Td>
      <Td text={data?._id}></Td>
      <Td text={new Date(data?.createdAt).toLocaleString()}></Td>

      <td>
        <button
          className="btn btn-link text-dark"
          style={iconStyle}
          title="View Profile"
          onClick={onViewClick}
        >
          <Eye />
        </button>
        <button
          className="btn btn-link text-primary"
          style={iconStyle}
          title="Edit"
          onClick={onEditClick}
        >
          <PencilSquare />
        </button>
        <button
          className="btn btn-link text-danger"
          style={iconStyle}
          title="Delete"
          onClick={onDeleteClick}
        >
          <Trash />
        </button>
      </td>
    </tr>
  )
}

export default TableRow
