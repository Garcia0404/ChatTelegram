import { AuthRouter } from './AuthRouter'
import { Aside } from '../components'
import { App } from '../App'
import { Route, Routes } from 'react-router-dom'
import { UserPage } from '../pages/UserPage'

export const InternalRoutes = () => {
  return (
    <AuthRouter>
      <div className="h-screen flex">
        <Aside />
        <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='/:id' element={<UserPage />}></Route>
          <Route path='/404' element={<>404 Not Found</>}></Route>
        </Routes>
      </div>
    </AuthRouter>
  )
}
