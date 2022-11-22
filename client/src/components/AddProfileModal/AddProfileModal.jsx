import { useContext, useState } from 'react'
import { ProfilesContext } from '../../contexts/profilesContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Spinner from 'react-bootstrap/Spinner'
import { createNewProfile } from '../../actions/profilesActions'

const AddProfileModal = () => {
  const { showAddModal, setShowAddModal, dispatch, loading } =
    useContext(ProfilesContext)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await createNewProfile(dispatch, {
      first_name: firstName,
      last_name: lastName,
      email,
    })
    if (showAddModal && success) setSuccess(true)
  }

  const onModalClose = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setSuccess(false)
    setShowAddModal(false)
  }

  return (
    <Modal show={showAddModal} onHide={onModalClose} centered>
      <Modal.Header>
        <Modal.Title>Create New Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        ) : !success ? (
          <Form onSubmit={handleSubmit} id="NewProfileForm">
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
                  autoFocus
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
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        ) : (
          <p>
            <b>Successfully Created Profile</b>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          form="NewProfileForm"
          disabled={loading || success ? true : false}
        >
          Create Profile
        </Button>
        <Button variant="secondary" onClick={onModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddProfileModal
