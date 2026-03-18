import React from 'react'
import { cn } from './cn'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Input({ label, error, className, ...props }: Props) {
  const id = React.useId()
  return (
    <label className="block">
      <div className="mb-1 text-sm font-medium text-slate-200">{label}</div>
      <input
        id={id}
        className={cn(
          'w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100',
          'placeholder:text-slate-500',
          'focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:border-violet-400/60',
          error && 'border-rose-500/70 focus:ring-rose-400/40 focus:border-rose-400/60',
          className,
        )}
        {...props}
      />
      {error ? <div className="mt-1 text-xs text-rose-300">{error}</div> : null}
    </label>
  )
}

