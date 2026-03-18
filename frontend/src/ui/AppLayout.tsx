import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from './Button'
import { clearToken } from '../lib/storage'

export function AppLayout() {
  const navigate = useNavigate()
  const qc = useQueryClient()

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/app" className="text-sm font-semibold tracking-wide text-slate-100">
            Parent Ride
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                clearToken()
                qc.clear()
                navigate('/login', { replace: true })
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

