import { useContext, useState } from 'react'
import { ProfilesContext } from '../../contexts/profilesContext'
import { deleteProfile } from '../../actions/profilesActions'
import { CLEAR_CURRENT_PROFILE } from '../../constants/actionTypes'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { useNavigate } from 'react-router-dom'
import { checkLocationProfile } from '../../utils/checkLocationProfile'

const DeleteProfileModal = () => {
  const {
    showDeleteModal,
    setShowDeleteModal,
    currentProfile,
    dispatch,
    loading,
  } = useContext(ProfilesContext)
  const [text, setText] = useState('')
  const [formError, setFormError] = useState(false)

  const navigate = useNavigate()

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const onDeleteClose = () => {
    dispatch({ type: CLEAR_CURRENT_PROFILE })
    setFormError(false)
    setText('')
    setShowDeleteModal(false)
  }

  const onDeleteSubmit = (e) => {
    e.preventDefault()
    if (text !== currentProfile?.first_name) return setFormError(true)
    setFormError(false)
    deleteProfile(dispatch, currentProfile._id)
    if (checkLocationProfile(window.location.pathname)) {
      navigate('/')
    }
  }

  return (
    <Modal show={showDeleteModal} onHide={onDeleteClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        ) : currentProfile?._id ? (
          <>
            <p>
              <b>Are you sure you want to permanently delete this profile?</b>
            </p>
            <p>
              Type the first name of the profile to permanently delete this
              profile. (First Name is case sensitive)
            </p>
            <p>
              {'Type: '}
              <i>{currentProfile?.first_name}</i>
            </p>

            {formError && (
              <i className="text-danger">
                Name doesn't match profiles first name.
              </i>
            )}
            <Form onSubmit={onDeleteSubmit} id="deleteForm">
              <Form.Group>
                <Form.Control
                  name="Search"
                  autoComplete="off"
                  type="text"
                  placeholder="Type Name To Delete"
                  required
                  value={text}
                  onChange={handleTextChange}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </>
        ) : (
          <p>
            <b>Successfully Deleted Profile</b>
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="danger"
          type="submit"
          form="deleteForm"
          title="Delete Profile"
          disabled={loading || !currentProfile?._id}
        >
          Delete
        </Button>
        <Button variant="secondary" onClick={onDeleteClose} title="Cancel">
          {currentProfile?._id ? 'Cancel' : 'Close'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteProfileModal
