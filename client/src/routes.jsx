import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import NotFound from './routes/NotFound'
import Home from './routes/Home'
import Search from './routes/Search'
import Profile from './routes/Profile'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} errorElement={<NotFound />}>
      <Route path="/search" element={<Search />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Route>
  )
)
