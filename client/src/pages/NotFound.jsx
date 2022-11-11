import Container from 'react-bootstrap/Container'
import { useRouteError } from 'react-router-dom'
import ErrorMessage from '../components/shared/ErrorMessage'

const NotFound = () => {
  const error = useRouteError()

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center gap-3 text-center"
      style={{ minHeight: '100vh' }}
    >
      <ErrorMessage error={error} />
    </Container>
  )
}

export default NotFound
