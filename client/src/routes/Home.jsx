import ErrorMessage from '../components/shared/ErrorMessage'
import ProfilesTable from '../components/ProfilesTable'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Search from '../components/Search'
import NewButton from '../components/NewButton/NewButton'
import { useContext, useEffect } from 'react'
import { ProfilesContext } from '../contexts/profilesContext'
import { getProfiles } from '../actions/profilesActions'
import { useLocation, Outlet } from 'react-router-dom'
import ProfileModal from '../components/ProfileModal'
import DeleteProfileModal from '../components/DeleteProfileModal'

const Home = () => {
  const { loading, error, dispatch, profiles } = useContext(ProfilesContext)
  const location = useLocation()

  const profileLength = profiles.length

  useEffect(() => {
    if (location.pathname !== '/' || profileLength > 0) return
    let controller
    const fetchData = async () => {
      controller = await getProfiles(dispatch)
    }
    fetchData()
    return controller && controller.abort()
  }, [dispatch, location, profileLength])

  return (
    <>
      <DeleteProfileModal />
      <ProfileModal />
      <Outlet />
      <Container className="mt-5 mb-5">
        <Search />
        <NewButton />
        <ProfilesTable data={profiles} />
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
    </>
  )
}

export default Home
