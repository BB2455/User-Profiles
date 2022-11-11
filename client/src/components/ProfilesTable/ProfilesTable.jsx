import Table from 'react-bootstrap/Table'
import TableData from './TableData'

const ProfilesTable = ({ data }) => {
  return (
    <Table striped hover responsive="xl">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">User Id</th>
          <th scope="col">Created At</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((data, index) => {
            return <TableData data={data} index={index} key={data?._id} />
          })}
      </tbody>
    </Table>
  )
}

export default ProfilesTable
