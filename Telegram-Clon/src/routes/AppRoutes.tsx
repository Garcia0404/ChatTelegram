import { Route, Routes } from "react-router-dom"
import { InternalRoutes } from "./InternalRoutes"
import { SignInPage } from "../pages/SignInPage"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/signIn' element={<SignInPage/>}></Route>
      <Route path='/*' element={<InternalRoutes/>}></Route>
    </Routes>
  )
}
