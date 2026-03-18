import { Navigate, createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './ui/AppLayout'
import { LoginPage } from './views/LoginPage'
import { RegisterPage } from './views/RegisterPage'
import { DashboardPage } from './views/DashboardPage'
import { RequireAuth } from './views/RequireAuth'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/app',
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [{ index: true, element: <DashboardPage /> }],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
])

