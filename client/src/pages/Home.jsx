import ErrorMessage from '../components/shared/ErrorMessage'
import ProfilesTable from '../components/ProfilesTable'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Search from '../components/Search'
import NewButton from '../components/NewButton/NewButton'
import { useContext, useEffect } from 'react'
import { ProfilesContext } from '../contexts/profilesContext'
import axios from 'axios'
import {
  END_LOADING,
  ERROR,
  FETCH_ALL,
  START_LOADING,
} from '../constants/actionTypes'

const Home = () => {
  const { loading, error, dispatch, profiles } = useContext(ProfilesContext)

  useEffect(() => {
    const abortController = new AbortController()
    dispatch({ type: START_LOADING })
    axios
      .get(`${process.env.REACT_APP_BASE_URL}profiles`, {
        signal: abortController.signal,
      })
      .then((response) => {
        dispatch({ type: FETCH_ALL, payload: response.data })
      })
      .catch((error) => {
        console.log(error.name)
        if (error.name === 'AbortError' || error.name === 'CanceledError')
          return
        dispatch({ type: ERROR, payload: error })
      })
      .finally(dispatch({ type: END_LOADING }))
    return () => abortController && abortController.abort()
  }, [dispatch])

  return (
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
  )
}

export default Home
