import { createContext, useEffect, useState } from 'react'
import { io,Socket } from 'socket.io-client'

export const SocketContext = createContext<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
export const SocketProvider:React.FC<{children:JSX.Element|JSX.Element[]}> = ({children}) => {
  const [socket,setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket)
    return () => {
      newSocket.close();
    };
  },[])
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
