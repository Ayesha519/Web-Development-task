import React from 'react'
import { cn } from './cn'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ className, variant = 'primary', ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400',
        'disabled:opacity-50 disabled:pointer-events-none',
        variant === 'primary' &&
          'bg-violet-500 text-white hover:bg-violet-400 active:bg-violet-500/90 shadow-sm shadow-violet-500/20',
        variant === 'secondary' && 'bg-slate-800 text-slate-100 hover:bg-slate-700',
        variant === 'ghost' && 'bg-transparent text-slate-100 hover:bg-white/10',
        className,
      )}
      {...props}
    />
  )
}

