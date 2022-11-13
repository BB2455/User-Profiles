import ErrorMessage from '../components/shared/ErrorMessage'
import ProfilesTable from '../components/ProfilesTable'
import useAxios from '../hooks/useAxios'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Search from '../components/Search'
import NewButton from '../components/NewButton/NewButton'

const Home = () => {
  const { response, loading, error } = useAxios({
    url: '/profiles/',
    method: 'get',
  })
  return (
    <Container className="mt-5 mb-5">
      <Search />
      <NewButton />
      <ProfilesTable data={response} />
      {loading && (
        <Container className="d-flex justify-content-center mt-5">
          <Spinner />
        </Container>
      )}
      {error && (
        <Container className="d-flex flex-column align-items-center gap-3 mt-5">
          <ErrorMessage error={error} />
        </Container>
      )}
    </Container>
  )
}

export default Home
