import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { PersonPlusFill } from 'react-bootstrap-icons'

const NewButton = () => {
  return (
    <Container className="d-flex justify-content-end pb-2">
      <Button variant="primary">
        <PersonPlusFill className="me-2" />
        New Profile
      </Button>
    </Container>
  )
}

export default NewButton
