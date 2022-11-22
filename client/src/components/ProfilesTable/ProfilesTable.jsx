import Table from 'react-bootstrap/Table'
import TableRow from './TableRow'

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
        {data.length > 0 &&
          data.map((data, index) => {
            if (index > 29) return null // Temporary
            return <TableRow data={data} index={index} key={data?._id} />
          })}
      </tbody>
    </Table>
  )
}

export default ProfilesTable
