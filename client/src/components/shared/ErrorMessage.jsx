const ErrorMessage = ({ error }) => {
  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i style={{ color: 'grey' }}>{error.statusText || error.message}</i>
      </p>
    </>
  )
}

export default ErrorMessage
