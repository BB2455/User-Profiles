import { Trash, PencilSquare, Eye } from 'react-bootstrap-icons'

const Td = ({ text }) => {
  return <td title={text}>{text}</td>
}

const TableData = ({ data, index }) => {
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
          style={{ paddingTop: '0', paddingBottom: '0', paddingLeft: '0' }}
          title="View Profile"
        >
          <Eye />
        </button>
        <button
          className="btn btn-link text-primary"
          style={{ paddingTop: '0', paddingBottom: '0', paddingLeft: '0' }}
          title="Edit"
        >
          <PencilSquare />
        </button>
        <button
          className="btn btn-link text-danger"
          style={{ paddingTop: '0', paddingBottom: '0', paddingLeft: '0' }}
          title="Delete"
        >
          <Trash />
        </button>
      </td>
    </tr>
  )
}

export default TableData
