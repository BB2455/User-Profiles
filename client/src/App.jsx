import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import useAxios from './hooks/useAxios'

function App() {
  const { response } = useAxios({
    url: '/profiles/',
    method: 'get',
  })
  response && console.log(response)
  return (
    <Container className="mt-5 mb-5">
      <Table striped hover responsive="xl">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {response &&
            response.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data?.first_name}</td>
                  <td>{data?.last_name}</td>
                  <td>{data?.email}</td>
                  <td>{data?._id}</td>
                  <td>{new Date(data?.createdAt).toLocaleString()}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </Container>
  )
}

export default App
