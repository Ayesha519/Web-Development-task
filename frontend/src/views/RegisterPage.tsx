import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { registerUser } from '../lib/users'
import { setToken } from '../lib/storage'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import type { ApiError } from '../lib/api'

const schema = z
  .object({
    name: z.string().min(2, 'Name is too short'),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

type FormValues = z.infer<typeof schema>

export function RegisterPage() {
  const navigate = useNavigate()
  const form = useForm<FormValues>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      registerUser({ name: values.name, email: values.email, password: values.password }),
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
            <h1 className="text-2xl font-semibold text-white">Create account</h1>
            <p className="mt-1 text-sm text-slate-300">Start using Parent Ride.</p>
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
              label="Name"
              placeholder="Your name"
              autoComplete="name"
              error={form.formState.errors.name?.message}
              {...form.register('name')}
            />
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
              autoComplete="new-password"
              error={form.formState.errors.password?.message}
              {...form.register('password')}
            />
            <Input
              label="Confirm password"
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              error={form.formState.errors.confirmPassword?.message}
              {...form.register('confirmPassword')}
            />

            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating…' : 'Create account'}
            </Button>
          </form>

          <div className="mt-6 text-sm text-slate-300">
            Already have an account?{' '}
            <Link className="font-medium text-violet-300 hover:text-violet-200" to="/login">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

