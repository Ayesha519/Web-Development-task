import { getApiBaseUrl } from './env'
import { getToken } from './storage'

export type ApiError = {
  message: string
  status?: number
}

async function readErrorMessage(res: Response) {
  const contentType = res.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    try {
      const data = (await res.json()) as unknown
      if (data && typeof data === 'object' && 'message' in data && typeof (data as any).message === 'string') {
        return (data as any).message as string
      }
    } catch {
      // ignore
    }
  }
  try {
    const text = await res.text()
    if (text) return text
  } catch {
    // ignore
  }
  return `Request failed (${res.status})`
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken()
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`

  const headers = new Headers(init?.headers)
  headers.set('accept', 'application/json')
  if (!headers.has('content-type') && init?.body) headers.set('content-type', 'application/json')
  if (token) headers.set('authorization', `Bearer ${token}`)

  const res = await fetch(url, { ...init, headers })
  if (!res.ok) {
    const message = await readErrorMessage(res)
    const err: ApiError = { message, status: res.status }
    throw err
  }

  // Some endpoints may return empty body
  const contentType = res.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return (undefined as unknown) as T
  }
  return (await res.json()) as T
}

