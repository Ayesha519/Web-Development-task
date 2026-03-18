import { apiFetch } from './api'

export type AuthResponse = {
  token: string
  user?: unknown
}

export type CurrentUserResponse = unknown

export async function registerUser(payload: unknown) {
  return apiFetch<AuthResponse>('/api/v1/users/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function loginUser(payload: unknown) {
  return apiFetch<AuthResponse>('/api/v1/users/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getCurrentUser() {
  return apiFetch<CurrentUserResponse>('/api/v1/users/get-current-user', { method: 'GET' })
}

