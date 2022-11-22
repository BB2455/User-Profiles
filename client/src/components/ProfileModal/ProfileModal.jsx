import { useContext, useState, useEffect } from 'react'
import { ProfilesContext } from '../../contexts/profilesContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Spinner from 'react-bootstrap/Spinner'
import { updateProfile } from '../../actions/profilesActions'
import {
  CLEAR_ERROR,
  ERROR,
  CLEAR_CURRENT_PROFILE,
} from '../../constants/actionTypes'
import { useLocation, useNavigate } from 'react-router-dom'
import { checkLocationProfile } from '../../utils/checkLocationProfile'

const ProfileModal = () => {
  const {
    showEditModal,
    setShowEditModal,
    showProfileModal,
    setShowProfileModal,
    setShowDeleteModal,
    dispatch,
    loading,
    currentProfile,
    error,
  } = useContext(ProfilesContext)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const [success, setSuccess] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const checkChanges = () => {
    if (
      firstName === currentProfile.first_name &&
      lastName === currentProfile.last_name &&
      email === currentProfile.email
    )
      return false
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!checkChanges()) {
      dispatch({
        type: ERROR,
        payload: { message: 'Must make new changes before updating' },
      })
      return
    }
    setSuccess(false)
    const success = await updateProfile(dispatch, currentProfile._id, {
      first_name: firstName,
      last_name: lastName,
      email,
    })
    if (showEditModal && success) setSuccess(true)
  }

  const onModalClose = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setSuccess(false)
    dispatch({ type: CLEAR_ERROR })
    dispatch({ type: CLEAR_CURRENT_PROFILE })
    setShowEditModal(false)
    setShowProfileModal(false)
    if (checkLocationProfile(location.pathname)) {
      navigate('/')
    }
  }

  useEffect(() => {
    if (showEditModal || showProfileModal) {
      setFirstName(currentProfile?.first_name || '')
      setLastName(currentProfile?.last_name || '')
      setEmail(currentProfile?.email || '')
    }
  }, [showEditModal, showProfileModal, currentProfile])

  return (
    <Modal
      show={showEditModal || showProfileModal}
      onHide={onModalClose}
      centered
    >
      <Modal.Header>
        <Modal.Title>
          {showEditModal ? 'Edit Profile' : 'User Profile'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        ) : currentProfile?._id ? (
          <Form onSubmit={handleSubmit} id="EditProfileForm">
            <Form.Group>
              <FloatingLabel
                controlId="floatingId"
                label="Profile Id"
                className="mb-3"
              >
                <Form.Control
                  name="Profile Id"
                  autoComplete="off"
                  type="text"
                  placeholder="Profile Id"
                  required
                  value={currentProfile?._id}
                  disabled
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId="floatingFirstName"
                label="First Name"
                className="mb-3"
              >
                <Form.Control
                  name="First Name"
                  autoComplete="off"
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={showProfileModal ? true : false}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId="floatingLastName"
                label="Last Name"
                className="mb-3"
              >
                <Form.Control
                  name="Last Name"
                  autoComplete="off"
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={showProfileModal ? true : false}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId="floatingEmail"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  name="Email"
                  autoComplete="off"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={showProfileModal ? true : false}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId="floatingCreated"
                label="Created At"
                className="mb-3"
              >
                <Form.Control
                  name="Created At"
                  autoComplete="off"
                  type="text"
                  placeholder="Created At"
                  required
                  value={currentProfile?.createdAt}
                  disabled
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId="floatingUpdated"
                label="Updated At"
                className="mb-3"
              >
                <Form.Control
                  name="Updated At"
                  autoComplete="off"
                  type="text"
                  placeholder="Updated At"
                  required
                  value={currentProfile?.updatedAt}
                  disabled
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        ) : (
          <p>
            <b>No Profile Found</b>
          </p>
        )}

        {success && (
          <b className="text-success">
            <i>Successfully Updated Profile</i>
          </b>
        )}
        {error && <i className="text-danger">{error.message}</i>}
      </Modal.Body>
      <Modal.Footer>
        {showEditModal && (
          <Button
            variant="warning"
            type="submit"
            form="EditProfileForm"
            disabled={loading || showProfileModal ? true : false}
          >
            Update Profile
          </Button>
        )}
        {showProfileModal && currentProfile?._id && (
          <>
            <Button
              variant="warning"
              onClick={() => {
                setShowEditModal(true)
                setShowProfileModal(false)
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setShowDeleteModal(true)
                setShowProfileModal(false)
              }}
            >
              Delete
            </Button>
          </>
        )}
        <Button variant="secondary" onClick={onModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProfileModal
