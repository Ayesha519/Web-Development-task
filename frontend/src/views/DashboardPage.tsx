import { useQuery } from '@tanstack/react-query'

import { getCurrentUser } from '../lib/users'
import type { ApiError } from '../lib/api'

export function DashboardPage() {
  const q = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  })

  if (q.isLoading) return <div className="text-slate-300">Loading…</div>

  if (q.isError) {
    const err = q.error as ApiError
    return (
      <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">
        {err.message || 'Failed to load user.'}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-300">
          This page calls <code className="rounded bg-white/10 px-1.5 py-0.5">/api/v1/users/get-current-user</code>.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-medium text-slate-200">Current user response</div>
        <pre className="mt-2 overflow-auto rounded-xl bg-slate-950/70 p-3 text-xs text-slate-200">
          {JSON.stringify(q.data, null, 2)}
        </pre>
      </div>
    </div>
  )
}

