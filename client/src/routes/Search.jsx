import { useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { ProfilesContext } from '../contexts/profilesContext'
import { getProfilesBySearch } from '../actions/profilesActions'

const Search = () => {
  const { dispatch } = useContext(ProfilesContext)
  const location = useLocation()

  useEffect(() => {
    let controller
    const fetchSearchData = async () => {
      controller = await getProfilesBySearch(dispatch, location.search)
    }
    if (location.pathname === '/search') fetchSearchData()
    return controller && controller.abort()
  }, [dispatch, location])

  return <></>
}

export default Search
