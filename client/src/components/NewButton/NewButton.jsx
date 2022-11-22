import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { PersonPlusFill } from 'react-bootstrap-icons'
import { useContext } from 'react'
import { ProfilesContext } from '../../contexts/profilesContext'

const NewButton = () => {
  const { setShowAddModal } = useContext(ProfilesContext)
  return (
    <Container className="d-flex justify-content-end pb-2">
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        <PersonPlusFill className="me-2" />
        New Profile
      </Button>
    </Container>
  )
}

export default NewButton
