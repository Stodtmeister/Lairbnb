import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { LoginFormPage, SignupFormPage } from './components'

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginFormPage /> },
  { path: '/signup', element: <SignupFormPage /> }
])
