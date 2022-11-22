import { useParams } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { ProfilesContext } from '../contexts/profilesContext'
import { getProfileById } from '../actions/profilesActions'

const Profile = () => {
  const { dispatch, currentProfile, setShowProfileModal } =
    useContext(ProfilesContext)
  const { id } = useParams()

  useEffect(() => {
    let controller
    if (currentProfile?._id) return
    const fetchProfileData = async () => {
      controller = await getProfileById(dispatch, id)
    }
    fetchProfileData()
    setShowProfileModal(true)
    return controller && controller.abort()
  }, [dispatch, id, currentProfile, setShowProfileModal])

  return <></>
}

export default Profile
