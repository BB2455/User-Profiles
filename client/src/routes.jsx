import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import NotFound from './pages/NotFound'
import Home from './pages/Home'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} errorElement={<NotFound />}>
      <Route path="/search" element={<></>} />
      <Route path="/profile/:id" element={<></>} />
    </Route>
  )
)
