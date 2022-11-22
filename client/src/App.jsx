import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import AddProfileModal from './components/AddProfileModal'

function App() {
  return (
    <>
      <AddProfileModal />
      <RouterProvider router={router} />
    </>
  )
}

export default App
