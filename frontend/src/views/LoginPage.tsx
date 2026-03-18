import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { loginUser } from '../lib/users'
import { setToken } from '../lib/storage'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import type { ApiError } from '../lib/api'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const navigate = useNavigate()
  const form = useForm<FormValues>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (values: FormValues) => loginUser(values),
    onSuccess: (data) => {
      if (data?.token) setToken(data.token)
      navigate('/app', { replace: true })
    },
  })

  const err = mutation.error as ApiError | null

  return (
    <div className="min-h-full">
      <div className="mx-auto flex min-h-[100svh] max-w-5xl items-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-300">Sign in to Parent Ride.</p>
          </div>

          {err?.message ? (
            <div className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {err.message}
            </div>
          ) : null}

          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          >
            <Input
              label="Email"
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              error={form.formState.errors.email?.message}
              {...form.register('email')}
            />
            <Input
              label="Password"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              error={form.formState.errors.password?.message}
              {...form.register('password')}
            />

            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-sm text-slate-300">
            Don’t have an account?{' '}
            <Link className="font-medium text-violet-300 hover:text-violet-200" to="/register">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

