import ReactDOM from 'react-dom/client'
import './index.css'
import { AppContext } from './context/AppContext.tsx'
import { AppRoutes } from './routes/AppRoutes.tsx'
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './context/SocketProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppContext>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </AppContext>
  </BrowserRouter>
  ,
)
