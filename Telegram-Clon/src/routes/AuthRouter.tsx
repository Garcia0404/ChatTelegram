import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../context/AppContext'
export const AuthRouter:React.FC<{children:JSX.Element|JSX.Element[]}> = ({children}) => {
  const {ok} = useContext(Context) as {ok:boolean}
  return ok?<>{children}</>:<Navigate to='/signIn'></Navigate>
}
