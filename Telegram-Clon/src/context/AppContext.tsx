import { createContext, useState } from "react"
interface ContextType {
  ok: boolean;
  setOk: React.Dispatch<React.SetStateAction<boolean>>;
  email: string | null;
  password: string | null;
}
export const Context = createContext<ContextType>({
  ok: false,
  setOk: () => {},
  email: null,
  password: null,
});
export const AppContext:React.FC<{children:JSX.Element|JSX.Element[]}> = ({children}) => {
  const [ok,setOk] = useState(false)
  const email = localStorage.getItem('email')
  const password = localStorage.getItem('password')

  return (
    <Context.Provider value={{ok,setOk,email,password}}>
      {children}
    </Context.Provider>
  )
}
